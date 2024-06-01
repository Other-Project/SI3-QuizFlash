import {QuestionStats} from "./question-stats.model";

export interface QuizStats {
  id: string;
  userId: string;
  quizId: string;
  date: Date;
  questionsStats: QuestionStats[];
}
