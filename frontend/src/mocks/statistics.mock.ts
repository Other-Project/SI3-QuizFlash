import {QuizStats} from "../models/quiz-stats.model";
import {QuestionStats} from "../models/question-stats.model";
import {QuestionType} from "../models/question-type.models";


export const QUESTIONSTAT1: QuestionStats = {
  questionId: "1",
  questionType: QuestionType.TextOnly,
  success: true,
  timeSpent: 2.2,
  assistedAnswer: false
}

export const QUESTIONSTAT2: QuestionStats = {
  questionId: "2",
  questionType: QuestionType.TextOnly,
  success: true,
  timeSpent: 3.1,
  assistedAnswer: false
}

export const QUESTIONSTAT3: QuestionStats = {
  questionId: "3",
  questionType: QuestionType.Sound,
  success: false,
  timeSpent: 5,
  assistedAnswer: false
}

export const QUESTIONSTAT1TRY2: QuestionStats = {
  questionId: "1",
  questionType: QuestionType.TextOnly,
  success: false,
  timeSpent: 2,
  assistedAnswer: false
}

export const QUESTIONSTAT2TRY2: QuestionStats = {
  questionId: "2",
  questionType: QuestionType.TextOnly,
  success: true,
  timeSpent: 2.8,
  assistedAnswer: false
}

export const QUESTIONSTAT3TRY2: QuestionStats = {
  questionId: "3",
  questionType: QuestionType.Sound,
  success: true,
  timeSpent: 3,
  assistedAnswer: false
}

export const QUIZSTATS1: QuizStats = {
  userId: "134b849f-fd4b-4b13-b377-f283b117365d",
  quizId: "1",

  questionsStats: [QUESTIONSTAT1, QUESTIONSTAT2, QUESTIONSTAT3]
}

export const QUIZSTATS1TRY2: QuizStats = {
  userId: "134b849f-fd4b-4b13-b377-f283b117365d",
  quizId: "1",

  questionsStats: [QUESTIONSTAT1TRY2, QUESTIONSTAT2TRY2, QUESTIONSTAT3TRY2]
}

export const QUIZSTATS2: QuizStats = {
  userId: "134b849f-fd4b-4b13-b377-f283b117365d",
  quizId: "2",

  questionsStats: [QUESTIONSTAT1, QUESTIONSTAT2]
}


export const STATISTICS: QuizStats[] = [
  QUIZSTATS1, QUIZSTATS2, QUIZSTATS1TRY2
]
