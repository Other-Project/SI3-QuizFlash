import {QuestionType} from "./question-type.models";
import {Answer} from "./answer.models";

//A question has a text, a list of false answers, one unique true answer, a type, an imageUrl if there is an image,
//and like the imageUrl there is a soundUrl if there is a sound in the question
export interface Question {
  id: string;
  text: string;
  answers: Answer[];
  type:QuestionType;
  imageUrl:string;
  soundUrl:string;
}
