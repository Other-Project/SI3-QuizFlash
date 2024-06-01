import {QuestionType} from "./question-type.models";
import {Attempt} from "./attempt.model";

export interface QuestionStats {
  questionId: number;
  questionType: QuestionType;
  success: boolean;
  attempts: Attempt[];
}
