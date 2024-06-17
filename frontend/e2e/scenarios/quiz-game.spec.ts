import {expect, test} from "@playwright/test";
import {testUrl} from "../e2e.config";
import {QuizSelectionFixture} from "../../src/app/quiz/quiz-game-selection/quiz-selection/quiz-selection.fixture";
import {ProfileListFixture} from "../../src/app/profiles/profile-list/profile-list.fixture";
import {Quiz} from "../../src/models/quiz.models";
import {playQuestion} from "../e2e.utils";
import {QuizGameFixture} from "../../src/app/quiz/quiz-game/quiz-game.fixture";

test.describe("Playing of a quiz by a patient", () => {
  test("Quiz test", async ({page, request}) => {
    const quizId = "1717357602847";

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

      // Check if the profile button is visible
      await expect(martineProfileButton!).toBeVisible();

      // User selection
      await martineProfileButton!.click();
      await expect(page).toHaveURL(`${testUrl}/quizzes`);
    });

    await test.step("Select Quiz", async () => {
      // Getting French song quiz button
      const frenchSongQuizButton = await quizSelectionFixture.getQuizButton("Chansons Françaises");

      // Check if the French song quiz button is visible
      await expect(frenchSongQuizButton!).toBeVisible();

      // Launch the French song quiz
      await frenchSongQuizButton!.click();
      await expect(page).toHaveURL(`${testUrl}/quizzes/quiz/${quizId}`);
    });

    await test.step("Check Sound Config Page", async () => {
      // Check if the config sound text is in the page
      await quizGameFixture.getSoundSettingsFixture().isVisible();

      // Getting the switch to the quiz button
      const switchToQuizButton = quizGameFixture.getSoundSettingsFixture().getSwitchToQuizButton();
      // Check if the switch to the quiz button is visible
      await expect(switchToQuizButton).toBeVisible();

      // Switch to the quiz
      await switchToQuizButton.click();
    });

    await test.step("Select a correct answer", async () => {
      await playQuestion(quiz, true, quizGameFixture);
      const nextButton = quizGameFixture.getQuestionResultFixture().getNextButton();
      // Check if next button visible
      await expect(nextButton).toBeVisible();
      await nextButton.click();
    });

    await test.step("Select a wrong answer", async () => {
      await playQuestion(quiz, false, quizGameFixture);
      const nextButton = quizGameFixture.getQuestionResultFixture().getNextButton();
      // Check if next button visible
      await expect(nextButton).toBeVisible();
      await nextButton.click();
    });

    await test.step("Select a wrong answer", async () => {
      await playQuestion(quiz, false, quizGameFixture);
      const nextButton = quizGameFixture.getQuestionResultFixture().getNextButton();
      // Check if next button is visible
      await expect(nextButton).toBeVisible();
      await nextButton.click();
    });

    await test.step("Quiz end", async () => {
      await playQuestion(quiz, true, quizGameFixture);
      const finishButton = quizGameFixture.getQuestionResultFixture().getFinishButton();
      // Check if the finish button is visible
      await expect(finishButton).toBeVisible();
      await finishButton.click();
    });

    await test.step("Check end", async () => {
      await quizGameFixture.isFinishScreen();
      const goBackToMenuButton = quizGameFixture.getGoBackToMenuButton();
      // Check if the go back to menu button is visible
      await expect(goBackToMenuButton).toBeVisible();
      await goBackToMenuButton.click();

      // Check that the redirection has worked
      await expect(page).toHaveURL(`${testUrl}/quizzes`);
    });
  });
});
