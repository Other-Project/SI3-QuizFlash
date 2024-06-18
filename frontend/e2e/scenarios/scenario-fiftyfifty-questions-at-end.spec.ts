import {expect, test} from "@playwright/test";
import {Quiz} from "../../src/models/quiz.models";
import {QuizGameFixture} from "../../src/app/quiz/quiz-game/quiz-game.fixture";
import {Locator} from "playwright";

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
});
