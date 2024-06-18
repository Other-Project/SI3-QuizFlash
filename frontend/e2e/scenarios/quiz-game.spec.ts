import {expect, test} from "@playwright/test";
import {testUrl} from "../e2e.config";
import {QuizSelectionFixture} from "../../src/app/quiz/quiz-game-selection/quiz-selection/quiz-selection.fixture";
import {ProfileListFixture} from "../../src/app/profiles/profile-list/profile-list.fixture";
import {Quiz} from "../../src/models/quiz.models";
import {checkVisibleAndClick, playQuestionTest} from "../e2e.utils";
import {QuizGameFixture} from "../../src/app/quiz/quiz-game/quiz-game.fixture";

test.describe("Playing of a quiz by a patient", () => {
  test("Quiz test", async ({page, request}) => {
    const quizId = "1718692508978";

    // Perform login and capture cookies
    const loginResponse = await request.post(`${testUrl}/api/auth/login/password`, {
      data: {
        username: 1715587135341,
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
      throw new Error("Failed to fetch quiz data");
    }
    const quiz = await quizResponse.json() as Quiz;

    await page.goto(testUrl);
    const profileListFixture = new ProfileListFixture(page);
    const quizSelectionFixture = new QuizSelectionFixture(page);
    const quizGameFixture = new QuizGameFixture(page);

    await test.step("Select User", async () => {
      // Getting Martine's profile button
      const martineProfileButton = await profileListFixture.getUserButton("Martine");
      // Check if the profile button is visible and user selection
      await checkVisibleAndClick(martineProfileButton!);

      await expect(page).toHaveURL(`${testUrl}/quizzes`);
    });

    await test.step("Select Quiz", async () => {
      // Getting French song quiz button
      const frenchSongQuizButton = await quizSelectionFixture.getQuizButton("Chansons Françaises");
      // Check if the French song quiz button is visible and launch it
      await checkVisibleAndClick(frenchSongQuizButton!);

      await expect(page).toHaveURL(`${testUrl}/quizzes/quiz/${quizId}`);
    });

    await test.step("Check Sound Config Page", async () => {
      // Check if the config sound text is in the page
      await quizGameFixture.getSoundSettingsFixture().isVisible();

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
      await quizGameFixture.isFinishScreen();
      // Getting the go back to menu button
      const goBackToMenuButton = quizGameFixture.getGoBackToMenuButton();
      await checkVisibleAndClick(goBackToMenuButton);

      // Check that the redirection has worked
      await expect(page).toHaveURL(`${testUrl}/quizzes`);
    });
  });
});
