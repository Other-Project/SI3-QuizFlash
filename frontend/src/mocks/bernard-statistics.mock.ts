import {QuizStats} from "../models/quiz-stats.model";
import {QuestionStats} from "../models/question-stats.model";
import {QuestionType} from "../models/question-type.models";


export const QUESTIONSTAT1: QuestionStats = {
  questionId: 1,
  questionType: QuestionType.TextOnly,
  success: true,
  attempts: [
    {
      attemptId: 11,
      chosenAnswersId: 3,
      timeSpent: 1,
      answerHint: false,
      hiddenAnswers: [],
    },
    {
      attemptId: 12,
      chosenAnswersId: 2,
      timeSpent: 1.5,
      answerHint: false,
      hiddenAnswers: [3]
    },
    {
      attemptId: 13,
      chosenAnswersId: 4,
      timeSpent: 3,
      answerHint: false,
      hiddenAnswers: [3, 2]
    }
  ],
};

export const QUESTIONSTAT2: QuestionStats = {
  questionId: 2,
  questionType: QuestionType.TextOnly,
  success: true,
  attempts: [
    {
      attemptId: 14,
      chosenAnswersId: 3,
      timeSpent: 1,
      answerHint: false,
      hiddenAnswers: [],
    },
    {
      attemptId: 15,
      chosenAnswersId: 2,
      timeSpent: 1.5,
      answerHint: false,
      hiddenAnswers: [3]
    },
    {
      attemptId: 16,
      chosenAnswersId: 4,
      timeSpent: 3,
      answerHint: false,
      hiddenAnswers: [3, 2]
    }
  ],
};

export const BERNARD_QUIZ1: QuizStats = {
  id: 7,
  userId: 1716802522593,
  quizId: 2,
  date: new Date(2024, 2),
  questionsStats: [QUESTIONSTAT1, QUESTIONSTAT2]
};
