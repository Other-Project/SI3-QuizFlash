import {expect, Page} from "@playwright/test";
import {Quiz} from "../src/models/quiz.models";
import {QuizGameFixture} from "../src/app/quiz/quiz-game/quiz-game.fixture";
import {Locator} from "playwright";

export async function getButtonByText(page: Page, text: string, tag: string) {
  return page.locator(tag).getByRole("button").filter({hasText: text});
}

export async function playQuestionTest(quiz: Quiz, correctAnswer: boolean, quizGameFixture: QuizGameFixture) {
  const questionFixture = quizGameFixture.getQuestionFixture();
  const answersFixture = quizGameFixture.getAnswersFixture();
  const questionResultFixture = quizGameFixture.getQuestionResultFixture();

  const questionTitle = await questionFixture.getQuestionTitle();

  // Getting correct answer corresponding to the question
  const answer = quiz.questions.find(question => question.text == questionTitle)!
    .answers.find(answer => answer.trueAnswer == correctAnswer)!.answerText;

  // Obtain the button corresponding to the answer
  const answerButton = answersFixture.getAnswerButton(answer);
  await expect(answerButton).toBeVisible();
  await answerButton.click();

  // Screen check
  await ((correctAnswer) ? questionResultFixture.isCorrectScreen()
    : questionResultFixture.isIncorrectScreen());
}

export async function checkVisibleAndClick(button: Locator) {
  // Check if the button is visible
  await expect(button).toBeVisible();
  // Click the button
  await button.click();
}
