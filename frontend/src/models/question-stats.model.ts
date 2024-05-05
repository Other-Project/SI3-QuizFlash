import {QuestionType} from "./question-type.models";

export interface QuestionStats {
  questionId: string;
  questionType: QuestionType;
  chosenAnswersId: string[];
  numberOfAttempts: number;
  success: boolean;
  timeSpent: number;
  answerHint: boolean;
  hiddenAnswers: string[];
}
