import {expect, test} from "@playwright/test";
import {Quiz} from "../../src/models/quiz.models";
import {QuizGameFixture} from "../../src/app/quiz/quiz-game/quiz-game.fixture";
import {Locator} from "playwright";
import {endPageTest, getAnswers, getQuiz, launchQuiz, playQuestionTest} from "../e2e.utils";
import {testUrl} from "../e2e.config";

async function playReplayEndTest(quiz: Quiz, correctAnswer: boolean, quizGameFixture: QuizGameFixture) {
  const questionResultFixture = quizGameFixture.getQuestionResultFixture();
  const questionTitle = await quizGameFixture.getQuestionFixture().getQuestionTitle();

  // Getting correct answer corresponding to the question
  const answer = quiz.questions.find(question => question.text == questionTitle)!.answers.find(answer => answer.trueAnswer == correctAnswer)!.answerText;

  // Obtain the button corresponding to the answer
  await checkVisibleAndClick(quizGameFixture.getAnswersFixture().getAnswerButton(answer));

  // Screen check
  await (correctAnswer ? questionResultFixture.checkIsCorrectScreen() : questionResultFixture.checkIsIncorrectScreen());

  return questionTitle;
}

async function finishQuizReplayQuestion(quiz: Quiz, correctAnswer: boolean, quizGameFixture: QuizGameFixture, question: string) {
  const questionResultFixture = quizGameFixture.getQuestionResultFixture();
  const questionTitle = await quizGameFixture.getQuestionFixture().getQuestionTitle();

  // Verify that the question being played is the correct one
  expect(question == questionTitle).toBeTruthy();

  const answer = getAnswers(quiz, questionTitle, correctAnswer);

  // Obtain the button corresponding to the answer
  await checkVisibleAndClick(quizGameFixture.getAnswersFixture().getAnswerButton(answer));

  // Screen check
  await (correctAnswer ? questionResultFixture.checkIsCorrectScreen() : questionResultFixture.checkIsIncorrectScreen());

  const finishButton = quizGameFixture.getQuestionResultFixture().getFinishButton();
  await checkVisibleAndClick(finishButton);
}

async function checkVisibleAndClick(button: Locator) {
  // Check if the button is visible
  await expect(button).toBeVisible();
  // Click the button
  await button.click();
}

test.describe("Playing of a quiz by a patient with all the possibilities", () => {
  test("Quiz test", async ({page, request}) => {
    const quizId = "1718692508978";
    const quiz = await getQuiz(quizId, request) as Quiz;
    let replayAtEnd: string = "";

    await page.goto(testUrl);

    // Launch the quiz with the patient "Francescu"
    await launchQuiz(page, quizId, "Francescu");

    const quizGameFixture = new QuizGameFixture(page);

    await test.step("Check No Sound Config Page", async () => {
      // Getting the switch to the quiz button
      const switchToQuizButton = quizGameFixture.getSoundSettingsFixture().getSwitchToQuizButton();
      await expect(switchToQuizButton).not.toBeVisible();
    });

    await test.step("Chose false answer to replay at end", async () => {
      // Store the question to replay at the end
      replayAtEnd = await playReplayEndTest(quiz, false, quizGameFixture);
      // Getting the next button
      const nextButton = quizGameFixture.getQuestionResultFixture().getNextButton();
      // Check if the button is visible and switch to the next question
      await checkVisibleAndClick(nextButton);
    });

    await test.step("Play question normally", async () => {
      // Choose a true answer and select it
      await playQuestionTest(quiz, true, quizGameFixture);
      // Getting the next button
      const nextButton = quizGameFixture.getQuestionResultFixture().getNextButton();
      // Check if the button is visible and switch to the next question
      await checkVisibleAndClick(nextButton);
    });

    await test.step("Play question normally", async () => {
      // Choose a true answer and select it
      await playQuestionTest(quiz, true, quizGameFixture);
      // Getting the next button
      const nextButton = quizGameFixture.getQuestionResultFixture().getNextButton();
      // Check if the button is visible and switch to the next question
      await checkVisibleAndClick(nextButton);
    });

    await test.step("Verify that the question being played is the correct one", async () => {
      // Play the question
      await finishQuizReplayQuestion(quiz, false, quizGameFixture, replayAtEnd);
    });

    await endPageTest(page, quizGameFixture);
  });
});
