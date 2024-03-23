import {Question} from "./question.models";

//A quiz has an id to identify its, a title, a theme and a list of questions

//TODO add tags (how to implement that), reflect if it's better here or in question model
export interface Quiz{
  id:string;
  title:string;
  theme: string;
  thumbnailUrl: string;
  questions: Question[];
}
