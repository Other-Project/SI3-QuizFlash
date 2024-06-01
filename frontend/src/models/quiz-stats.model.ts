import {QuestionStats} from "./question-stats.model";

export interface QuizStats {
  id: number;
  userId: number;
  quizId: number;
  date: Date;
  questionsStats: QuestionStats[];
}
