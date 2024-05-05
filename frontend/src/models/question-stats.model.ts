import {QuestionType} from "./question-type.models";
import {Attempt} from "./attempt.model";

export interface QuestionStats {
  questionId: string;
  questionType: QuestionType;
  numberOfAttempts: number;
  success: boolean;
  attempts: Attempt[];
}
