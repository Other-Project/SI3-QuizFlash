import {QuestionType} from "./question-type.models";
import {Answer} from "./answer.models";

//A question has a text, a list of false answers, one unique true answer, a type, an imageUrl if there is an image,
//and like the imageUrl there is a soundUrl if there is a sound in the question

//TODO add tags (how to implement that), reflect if it's better here or in quiz model
export interface Question {
  text: string;
  answers: Answer[];
  type:QuestionType;
  imageUrl:string;
  soundUrl:string;
}
