import {QuestionType} from "./question-type.models";

export interface QuestionStats {
  questionId: string;

  questionType: QuestionType;
  answerChosenId: string;
  success: boolean;
  timeSpent: number;
  answerHint: boolean;
}
