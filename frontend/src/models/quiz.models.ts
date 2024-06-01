import {Question} from "./question.models";

export interface Quiz {
  id: number;
  title: string;
  tags: string[];
  thumbnailUrl: string;
  questions: Question[];
}
