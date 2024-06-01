import {QuestionType} from "./question-type.models";
import {Attempt} from "./attempt.model";

export interface QuestionStats {
  questionId: string;
  questionType: QuestionType;
  success: boolean;
  attempts: Attempt[];
}
