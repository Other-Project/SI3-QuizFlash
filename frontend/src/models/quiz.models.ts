import {Question} from "./question.models";

export interface Quiz{
  id:string;
  title:string;
  theme: string;
  questions: Question[];
}
