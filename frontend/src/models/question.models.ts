import {QuestionType} from "./question-type.models";

export interface Question {
  text: string;
  falseAnswers: string[];
  trueAnswer: string;
  type:QuestionType;
  imageUrl:string;
  soundUrl:string;
}
