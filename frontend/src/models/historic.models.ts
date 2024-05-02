import {QuizStats} from "./quiz-stats.model";

export interface Historic {
  userId: string;
  stats: QuizStats[];
}
