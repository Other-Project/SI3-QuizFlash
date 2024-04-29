import {QuestionType} from "./question-type.models";

export interface QuestionStats {
  questionId: string;
  questionType: QuestionType;
  answerChosenId: string[];
  numberOfAttempt: number;
  success: boolean;
  timeSpent: number;
  answerHint: boolean;
}
