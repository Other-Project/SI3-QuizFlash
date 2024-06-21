import {test} from "@playwright/test";
import {testUrl} from "../e2e.config";
import {Quiz} from "../../src/models/quiz.models";
import {QuizGameFixture} from "../../src/app/quiz/quiz-game/quiz-game.fixture";
import {checkVisibleAndClick, endPageTest, finishQuiz, getQuiz, launchQuiz, playQuestionTest} from "../e2e.utils";

test.describe("Playing of a quiz by a patient", () => {
  test("Quiz test", async ({page, request}) => {
    const quizId = "136b8923-9b70-43ae-ae63-cd76e84a7e16";
    const quiz = await getQuiz(quizId, request) as Quiz;

    await page.goto(testUrl);

    // Launch the quiz with the patient "Martine"
    await launchQuiz(page, quizId, "Martine");

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
      // Choose a false answer and select it
      await playQuestionTest(quiz, false, quizGameFixture);
      const nextButton = quizGameFixture.getQuestionResultFixture().getNextButton();
      await checkVisibleAndClick(nextButton);
    });

    await finishQuiz(quiz, quizGameFixture);

    await endPageTest(page, quizGameFixture);
  });
});
