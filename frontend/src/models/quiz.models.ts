import {Question} from "./question.models";

export interface Quiz {
  id: string;
  title: string;
  tags: string[];
  thumbnailUrl: string;
  questions: Question[];
}
