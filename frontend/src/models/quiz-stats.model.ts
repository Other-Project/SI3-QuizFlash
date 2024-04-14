import {QuestionStats} from "./question-stats.model";

export interface QuizStats {
  userId: string;
  quizId: string;

  questionsStats: QuestionStats[];
}
