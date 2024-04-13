import {QuizStats} from "../models/quiz-stats.model";
import {QuestionStats} from "../models/question-stats.model";
import {QuestionType} from "../models/question-type.models";

export const QUESTIONSTAT1: QuestionStats = {
  questionId: "1",
  questionType: QuestionType.TextOnly,
  success: true,
  timeSpent: 2.2,
  answerHint: true
}

export const QUESTIONSTAT2: QuestionStats = {
  questionId: "2",
  questionType: QuestionType.TextOnly,
  success: true,
  timeSpent: 4.3,
  answerHint: false
}

export const FRANCESCU_QUIZSTATS: QuizStats = {
  userId: "e1840a2b-9e61-4c2f-a002-d683b806ce3a",
  quizId: "2",

  questionsStats: [QUESTIONSTAT1, QUESTIONSTAT2]
}
