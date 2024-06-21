import {expect, test} from "@playwright/test";
import {Quiz} from "../../src/models/quiz.models";
import {QuizGameFixture} from "../../src/app/quiz/quiz-game/quiz-game.fixture";
import {Locator} from "playwright";
import {endPageTest, finishQuiz, getAnswers, getQuiz, launchQuiz, playQuestionTest} from "../e2e.utils";
import {testUrl} from "../e2e.config";

async function playFiftyFiftyQuestionTest(quiz: Quiz, correctAnswer: boolean, quizGameFixture: QuizGameFixture) {
  const questionResultFixture = quizGameFixture.getQuestionResultFixture();
  const questionTitle = await quizGameFixture.getQuestionFixture().getQuestionTitle();

  // Getting the 50/50 button
  let fiftyFiftyButton = quizGameFixture.getAnswersFixture().getAnswerButton("50/50");
  await expect(fiftyFiftyButton).toBeVisible();
  await fiftyFiftyButton.click();

  fiftyFiftyButton = quizGameFixture.getAnswersFixture().getAnswerButton("50/50");
  await expect(fiftyFiftyButton).not.toBeVisible();

  const answers = quiz.questions.find(question => question.text == questionTitle)!.answers;

  // Check if the 50/50 button is hidden
  let buttons = quizGameFixture.getAnswersFixture().getAnswerButtons();

  // Check if the good number of elements is hide by the 50/50
  await expect(buttons).toHaveCount(Math.floor(answers.length / 2));

  // Getting correct answer corresponding to the question
  const answer = getAnswers(quiz, questionTitle, correctAnswer);

  // Obtain the button corresponding to the answer
  const answerButton = quizGameFixture.getAnswersFixture().getAnswerButton(answer);
  await expect(answerButton).toBeVisible();
  await answerButton.click();

  // Screen check
  await ((correctAnswer) ? questionResultFixture.checkIsCorrectScreen() : questionResultFixture.checkIsIncorrectScreen());
}

async function playQuestionTestRemoveAnswers(quiz: Quiz, correctAnswer: boolean, quizGameFixture: QuizGameFixture) {
  const questionResultFixture = quizGameFixture.getQuestionResultFixture();
  const questionTitle = await quizGameFixture.getQuestionFixture().getQuestionTitle();

  const answers = quiz.questions.find(question => question.text == questionTitle)!.answers;
  let hidden: String[] = [];

  for (let k = 0; k < answers.length - 1; k++) {
    // Getting correct answer corresponding to the question
    if (answers.length - hidden.length < 3) {
      let fiftyFiftyButton = quizGameFixture.getAnswersFixture().getAnswerButton("50/50");
      await expect(fiftyFiftyButton).not.toBeVisible();
    }
    const answer = quiz.questions.find(question => question.text == questionTitle)!.answers.find(answer => answer.trueAnswer != correctAnswer && !hidden.find(hide => hide == answer.answerText))!.answerText;
    hidden.push(answer);

    // Obtain the button corresponding to the answer
    const answerButton = quizGameFixture.getAnswersFixture().getAnswerButton(answer);
    await expect(answerButton).toBeVisible();
    await answerButton.click();
  }

  await playQuestionTest(quiz, true, quizGameFixture);

  // Screen check
  await ((correctAnswer) ? questionResultFixture.checkIsCorrectScreen() : questionResultFixture.checkIsIncorrectScreen());
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

    await page.goto(testUrl);

    // Launch the quiz with the patient "Xavier"
    await launchQuiz(page, quizId, "Xavier");

    const quizGameFixture = new QuizGameFixture(page);

    await test.step("Check No Sound Config Page", async () => {
      // Getting the switch to the quiz button
      const switchToQuizButton = quizGameFixture.getSoundSettingsFixture().getSwitchToQuizButton();
      await expect(switchToQuizButton).not.toBeVisible();
    });

    await test.step("Play question with the usage of 50/50 button", async () => {
      // Play question
      await playFiftyFiftyQuestionTest(quiz, true, quizGameFixture);
      // Getting the next button
      const nextButton = quizGameFixture.getQuestionResultFixture().getNextButton();
      // Check if the button is visible and switch to the next question
      await checkVisibleAndClick(nextButton);
    });

    await test.step("Check that the answers are removed when the question is played normally", async () => {
      // Play question
      await playQuestionTestRemoveAnswers(quiz, true, quizGameFixture);
      // Getting the next button
      const nextButton = quizGameFixture.getQuestionResultFixture().getNextButton();
      // Check if the button is visible and switch to the next question
      await checkVisibleAndClick(nextButton);
    });

    // Play last question
    await finishQuiz(quiz, quizGameFixture);
    //Finish the quiz
    await endPageTest(page, quizGameFixture);
  });
});
