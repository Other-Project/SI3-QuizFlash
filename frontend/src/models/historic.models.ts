import {QuizStats} from "./quiz-stats.model";

export interface Historic {
  userId: number;
  date: Date;
  stat: QuizStats;
}
