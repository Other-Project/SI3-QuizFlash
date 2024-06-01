import {QuizStats} from "../models/quiz-stats.model";
import {QuestionStats} from "../models/question-stats.model";
import {QuestionType} from "../models/question-type.models";

export const QUESTIONSTAT1: QuestionStats = {
  questionId: 1,
  questionType: QuestionType.TextOnly,
  success: true,
  attempts: [
    {
      attemptId: 1,
      chosenAnswersId: 4,
      timeSpent: 2.2,
      answerHint: true,
      hiddenAnswers: [1, 2]
    }
  ],
}

export const QUESTIONSTAT2: QuestionStats = {
  questionId: 2,
  questionType: QuestionType.TextOnly,
  success: true,
  attempts: [
    {
      attemptId: 2,
      chosenAnswersId: 4,
      timeSpent: 4.3,
      answerHint: false,
      hiddenAnswers: [],
    }
  ],
}

export const FRANCESCU_QUIZSTATS: QuizStats = {
  id: 1,
  userId: 1716802549303,
  quizId: 2,
  date: new Date(2024, 1, 2),
  questionsStats: [QUESTIONSTAT1, QUESTIONSTAT2]
}
