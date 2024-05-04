import {QuizStats} from "../models/quiz-stats.model";
import {QuestionStats} from "../models/question-stats.model";
import {QuestionType} from "../models/question-type.models";


export const QUESTIONSTAT1: QuestionStats = {
  questionId: "1",
  questionType: QuestionType.TextOnly,
  chosenAnswersId: ["3", "2", "4"],
  numberOfAttempts: 3,
  success: true,
  timeSpent: 5,
  answerHint: false,
  answersHide: []
};

export const QUESTIONSTAT2: QuestionStats = {
  questionId: "2",
  questionType: QuestionType.TextOnly,
  chosenAnswersId: ["3", "2", "4"],
  numberOfAttempts: 3,
  success: true,
  timeSpent: 3,
  answerHint: false,
  answersHide: []
};

export const BERNARD_QUIZ1: QuizStats = {
  id: "7",
  userId: "98f9f0da-f011-431a-9361-482ab17f8561",
  quizId: "2",
  date: new Date(2024, 2),
  questionsStats: [QUESTIONSTAT1, QUESTIONSTAT2]
};
