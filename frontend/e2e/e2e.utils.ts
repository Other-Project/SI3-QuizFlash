import {expect, Page, test} from "@playwright/test";
import {testUrl} from "./e2e.config";
import {Quiz} from "../src/models/quiz.models";
import {APIRequestContext, Locator} from "playwright";
import {QuizGameFixture} from "../src/app/quiz/quiz-game/quiz-game.fixture";
import {ProfileListFixture} from "../src/app/profiles/profile-list/profile-list.fixture";
import {QuizSelectionFixture} from "../src/app/quiz/quiz-game-selection/quiz-selection/quiz-selection.fixture";
import {ProfilesFixture} from "../src/app/profiles/profiles.fixture";

export async function getButtonByText(page: Page, text: string, tag: string) {
  return page.locator(tag).getByRole("button").filter({hasText: text});
}

export async function getQuiz(quizId: string, request: APIRequestContext) {
  // Perform login and capture cookies
  const loginResponse = await request.post(`${testUrl}/api/auth/login/password`, {
    data: {
      username: "b84cba22-6388-4d5c-8b05-dd9d8637b5b6",
      password: "admin"
    }
  });

  if (!loginResponse.ok())
    throw new Error("Failed to log in");

  // Capture cookies from login response
  const cookies = loginResponse.headers()["set-cookie"];

  if (!cookies)
    throw new Error("No cookies set after login");

  // Fetch the quiz data using the request context with headers
  const headers = {
    "Cookie": cookies
  };

  const quizResponse = await request.get(`${testUrl}/api/quizzes/${quizId}`, {headers});
  if (!quizResponse.ok()) {
    throw new Error(`Failed to fetch quiz data (at ${testUrl}/api/quizzes/${quizId}): ${quizResponse.status()} ${quizResponse.statusText()}`);
  }
  return await quizResponse.json() as Quiz;
}

export async function checkVisibleAndClick(button: Locator) {
  // Check if the button is visible
  await expect(button).toBeVisible();
  // Click the button
  await button.click();
}

export function getAnswers(quiz: Quiz, questionTitle: string, correctAnswer: boolean) {
  return quiz.questions.find(question => question.text == questionTitle)!
    .answers.find(answer => answer.trueAnswer == correctAnswer)!.answerText;
}

export async function playQuestionTest(quiz: Quiz, correctAnswer: boolean, quizGameFixture: QuizGameFixture) {
  const questionResultFixture = quizGameFixture.getQuestionResultFixture();
  const questionTitle = await quizGameFixture.getQuestionFixture().getQuestionTitle();

  // Getting correct answer corresponding to the question
  const answer = getAnswers(quiz, questionTitle, correctAnswer);

  // Obtain the button corresponding to the answer
  const answerButton = quizGameFixture.getAnswersFixture().getAnswerButton(answer);
  await expect(answerButton).toBeVisible();
  await answerButton.click();

  // Screen check
  await ((correctAnswer) ? questionResultFixture.checkIsCorrectScreen()
    : questionResultFixture.checkIsIncorrectScreen());
}

export async function launchQuiz(page: Page, quizId: string, patient: string) {
  await test.step("Select User", async () => {
    const profilesFixture = new ProfilesFixture(page);
    const firstProfile = profilesFixture.getFirstProfile();
    // Wait for the server to load users
    await expect(firstProfile).toBeVisible({timeout: 50000});
    // Getting patient profile button
    const martineProfileButton = await new ProfileListFixture(page).getUserButton(patient);
    // Check if the profile button is visible and user selection
    await checkVisibleAndClick(martineProfileButton!);

    await expect(page).toHaveURL(`${testUrl}/quizzes`);
  });

  await test.step("Select Quiz", async () => {
    // Getting French song quiz button
    const frenchSongQuizButton = await new QuizSelectionFixture(page).getQuizButton("Chansons Françaises");
    // Check if the French song quiz button is visible and launch it
    await checkVisibleAndClick(frenchSongQuizButton!);

    await expect(page).toHaveURL(`${testUrl}/quizzes/quiz/${quizId}`);
  });
}

export async function endPageTest(page: Page, quizGameFixture: QuizGameFixture) {
  await test.step("Check end", async () => {
    await quizGameFixture.checkIsFinishScreen();
    // Getting the go back to menu button
    const goBackToMenuButton = quizGameFixture.getGoBackToMenuButton();
    await checkVisibleAndClick(goBackToMenuButton);

    // Check that the redirection has worked
    await expect(page).toHaveURL(`${testUrl}/quizzes`);
  });
}

export async function finishQuiz(quiz: Quiz, quizGameFixture: QuizGameFixture) {
  await test.step("Quiz end", async () => {
    await playQuestionTest(quiz, true, quizGameFixture);
    // Getting the quiz finish button
    const finishButton = quizGameFixture.getQuestionResultFixture().getFinishButton();
    await checkVisibleAndClick(finishButton);
  });
}
