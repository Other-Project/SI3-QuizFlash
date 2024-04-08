import {QuestionType} from "./question-type.models";

export interface QuestionStats {
  questionId: string;

  questionType: QuestionType;
  success: boolean;
  timeSpent: number;
  answerHint: boolean;
}
