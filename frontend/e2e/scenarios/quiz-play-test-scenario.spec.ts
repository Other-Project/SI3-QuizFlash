import {expect, test} from "@playwright/test";
import {testUrl} from "../e2e.config";
import {QuizSelectionFixture} from "../../src/app/quiz/quiz-game-selection/quiz-selection/quiz-selection.fixture";
import {ProfileListFixture} from "../../src/app/profiles/profile-list/profile-list.fixture";
import {Quiz} from "../../src/models/quiz.models";
import {QuizGameFixture} from "../../src/app/quiz/quiz-game/quiz-game.fixture";
import {Locator} from "playwright";
import {getQuiz} from "../e2e.utils";

async function playQuestionTest(quiz: Quiz, correctAnswer: boolean, quizGameFixture: QuizGameFixture) {
  const questionResultFixture = quizGameFixture.getQuestionResultFixture();
  const questionTitle = await quizGameFixture.getQuestionFixture().getQuestionTitle();

  // Getting correct answer corresponding to the question
  const answer = quiz.questions.find(question => question.text == questionTitle)!
    .answers.find(answer => answer.trueAnswer == correctAnswer)!.answerText;

  // Obtain the button corresponding to the answer
  const answerButton = quizGameFixture.getAnswersFixture().getAnswerButton(answer);
  await expect(answerButton).toBeVisible();
  await answerButton.click();

  // Screen check
  await ((correctAnswer) ? questionResultFixture.checkIsCorrectScreen()
    : questionResultFixture.checkIsIncorrectScreen());
}

async function checkVisibleAndClick(button: Locator) {
  // Check if the button is visible
  await expect(button).toBeVisible();
  // Click the button
  await button.click();
}

test.describe("Playing of a quiz by a patient", () => {
  test("Quiz test", async ({page, request}) => {
    const quizId = "1718692508978";
    const quiz = await getQuiz(quizId, request) as Quiz;

    await page.goto(testUrl);

    await test.step("Select User", async () => {
      // Getting Martine's profile button
      const martineProfileButton = await new ProfileListFixture(page).getUserButton("Martine");
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

    const quizGameFixture = new QuizGameFixture(page);

    await test.step("Check Sound Config Page", async () => {
      // Check if the config sound text is in the page
      await quizGameFixture.getSoundSettingsFixture().checkIsVisible();

      // Getting the switch to the quiz button
      const switchToQuizButton = quizGameFixture.getSoundSettingsFixture().getSwitchToQuizButton();
      // Check if the switch to the quiz button is visible and switch to the quiz
      await checkVisibleAndClick(switchToQuizButton);
    });

    await test.step("Select a correct answer", async () => {
      // Choose a true answer and select it
      await playQuestionTest(quiz, true, quizGameFixture);

      // Getting the next button
      const nextButton = quizGameFixture.getQuestionResultFixture().getNextButton();
      // Check if the button is visible and switch to the next question
      await checkVisibleAndClick(nextButton);
    });

    await test.step("Select a wrong answer", async () => {
      // Choose a false answer and select it
      await playQuestionTest(quiz, false, quizGameFixture);
      const nextButton = quizGameFixture.getQuestionResultFixture().getNextButton();
      await checkVisibleAndClick(nextButton);
    });

    await test.step("Select a wrong answer", async () => {
      await playQuestionTest(quiz, false, quizGameFixture);
      const nextButton = quizGameFixture.getQuestionResultFixture().getNextButton();
      await checkVisibleAndClick(nextButton);
    });

    await test.step("Quiz end", async () => {
      await playQuestionTest(quiz, true, quizGameFixture);
      // Getting the quiz finish button
      const finishButton = quizGameFixture.getQuestionResultFixture().getFinishButton();
      await checkVisibleAndClick(finishButton);
    });

    await test.step("Check end", async () => {
      await quizGameFixture.checkIsFinishScreen();
      // Getting the go back to menu button
      const goBackToMenuButton = quizGameFixture.getGoBackToMenuButton();
      await checkVisibleAndClick(goBackToMenuButton);

      // Check that the redirection has worked
      await expect(page).toHaveURL(`${testUrl}/quizzes`);
    });
  });
});
