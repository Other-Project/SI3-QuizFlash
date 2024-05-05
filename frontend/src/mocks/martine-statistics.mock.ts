import {QuizStats} from "../models/quiz-stats.model";
import {QuestionStats} from "../models/question-stats.model";
import {QuestionType} from "../models/question-type.models";


export const QUESTIONSTAT1: QuestionStats = {
  questionId: "1",
  questionType: QuestionType.TextOnly,
  chosenAnswersId: ["4"],
  numberOfAttempts: 1,
  success: true,
  timeSpent: 2.2,
  answerHint: false,
  hiddenAnswers: []
}

export const QUESTIONSTAT2: QuestionStats = {
  questionId: "2",
  questionType: QuestionType.TextOnly,
  chosenAnswersId: ["4"],
  numberOfAttempts: 1,
  success: true,
  timeSpent: 3.1,
  answerHint: false,
  hiddenAnswers: []
}

export const QUESTIONSTAT3: QuestionStats = {
  questionId: "3",
  questionType: QuestionType.Sound,
  chosenAnswersId: ["1"],
  numberOfAttempts: 1,
  success: false,
  timeSpent: 5,
  answerHint: false,
  hiddenAnswers: []
}

export const QUESTIONSTAT4: QuestionStats = {
  questionId: "4",
  questionType: QuestionType.TextOnly,
  chosenAnswersId: ["4"],
  numberOfAttempts: 1,
  success: true,
  timeSpent: 2.4,
  answerHint: false,
  hiddenAnswers: []
}

export const QUESTIONSTAT5: QuestionStats = {
  questionId: "5",
  questionType: QuestionType.TextOnly,
  chosenAnswersId: ["4"],
  numberOfAttempts: 1,
  success: true,
  timeSpent: 3.6,
  answerHint: false,
  hiddenAnswers: []
}

export const QUESTIONSTAT6: QuestionStats = {
  questionId: "6",
  questionType: QuestionType.Image,
  chosenAnswersId: ["3"],
  numberOfAttempts: 1,
  success: true,
  timeSpent: 2.5,
  answerHint: false,
  hiddenAnswers: []
}

export const QUESTIONSTAT1TRY2: QuestionStats = {
  questionId: "1",
  questionType: QuestionType.TextOnly,
  chosenAnswersId: ["1"],
  numberOfAttempts: 1,
  success: false,
  timeSpent: 2,
  answerHint: false,
  hiddenAnswers: []
}

export const QUESTIONSTAT2TRY2: QuestionStats = {
  questionId: "2",
  questionType: QuestionType.TextOnly,
  chosenAnswersId: ["4"],
  numberOfAttempts: 1,
  success: true,
  timeSpent: 2.8,
  answerHint: false,
  hiddenAnswers: []
}

export const QUESTIONSTAT3TRY2: QuestionStats = {
  questionId: "3",
  questionType: QuestionType.Sound,
  chosenAnswersId: ["3"],
  numberOfAttempts: 1,
  success: true,
  timeSpent: 3,
  answerHint: false,
  hiddenAnswers: []
}

export const MARTINE_QUIZ1TRY1: QuizStats = {
  id: "2",
  userId: "134b849f-fd4b-4b13-b377-f283b117365d",
  quizId: "2",
  date: new Date(2024, 2),
  questionsStats: [QUESTIONSTAT1, QUESTIONSTAT2, QUESTIONSTAT3]
}

export const MARTINE_QUIZ1TRY2: QuizStats = {
  id: "3",
  userId: "134b849f-fd4b-4b13-b377-f283b117365d",
  quizId: "2",
  date: new Date(2024, 2, 9),
  questionsStats: [QUESTIONSTAT1TRY2, QUESTIONSTAT2TRY2, QUESTIONSTAT3TRY2]
}

export const MARTINE_QUIZ2: QuizStats = {
  id: "4",
  userId: "134b849f-fd4b-4b13-b377-f283b117365d",
  quizId: "1",
  date: new Date(2024, 1, 30),
  questionsStats: [QUESTIONSTAT4, QUESTIONSTAT5, QUESTIONSTAT6]
}
