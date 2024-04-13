import {Injectable, Predicate} from "@angular/core";
import {QuizStats} from "../models/quiz-stats.model";
import {STATISTICS} from "../mocks/statistics.mock";
import {QuestionStats} from "../models/question-stats.model";
import {QuestionType} from "../models/question-type.models";

@Injectable({
  providedIn: "root"
})

export class StatisticsService {
  quizStatistics: QuizStats[] = STATISTICS;

  constructor() {
  }


  getAllQuizzesAnswerHintRate(patientId: string, questionType?: QuestionType) {
    return this.getRateByFilter(this.getPatientQuizzes(patientId, questionType), questionType, question => question.answerHint);
  }

  getAllQuizzesSuccessRate(patientId: string, questionType?: QuestionType) {
    return this.getRateByFilter(this.getPatientQuizzes(patientId, questionType), questionType);
  }

  getQuizSuccessRate(patientId: string, quizId: string, questionType?: QuestionType) {
    return this.getRateByFilter(this.getPatientQuizzes(patientId, undefined, quizId), questionType);
  }

  getAllQuizzesGraphData(patientId: string, questionType?: QuestionType): [string[], number[]] {
    const patientStats = this.getPatientQuizzes(patientId, questionType);
    return [patientStats.map((stat) => stat.quizId), patientStats.map(stat => this.getRateByFilter([stat], questionType))];
  }

  getQuizTriesGraphData(patientId: string, quizId: string, questionType?: QuestionType): [string[], number[]] {
    const patientStats = this.getPatientQuizzes(patientId, questionType, quizId);
    return [patientStats.map(stat => stat.quizId), patientStats.map(stat => this.getRateByFilter([stat], questionType))];
  }

  getTimeQuizGraphData(patientId: string, quizId: string, questionType?: QuestionType): [string[], number[]] {
    let result = this.getPatientQuizzes(patientId, questionType, quizId).flatMap(quiz => quiz.questionsStats
      .filter(question => this.isQuestionOfType(question, questionType)))
      .reduce((groups, question) => {
        (groups[question.questionId] ||= []).push(question);
        return groups;
      }, {} as Record<string, QuestionStats[]>);
    return [Object.keys(result), Object.values(result).map(question => this.average(question.map(stat => stat.timeSpent)) ?? 0)];
  }

  private getTimeDataQuizStats(stats: QuizStats[], questionType?: QuestionType) {
    let timeSpent = stats.flatMap(stat => stat.questionsStats
      .filter(question => this.isQuestionOfType(question, questionType))
      .map(question => question.timeSpent));
    return [this.sum(timeSpent), this.average(timeSpent) ?? 0];
  }

  getTimeDataForQuiz(patientId: string, quizId: string, questionType?: QuestionType) {
    return this.getTimeDataQuizStats(this.getPatientQuizzes(patientId, undefined, quizId), questionType);
  }

  /*********
   * UTILS *
   *********/

  private isQuestionOfType(question: QuestionStats, questionType?: QuestionType) {
    return !questionType || question.questionType == questionType;
  }

  private getPatientQuizzes(patientId: string, questionType?: QuestionType, quizId?: string) {
    return this.quizStatistics.filter(stat => stat.userId == patientId
      && (!quizId || stat.quizId == quizId)
      && (!questionType || stat.questionsStats.some(question => question.questionType == questionType)));
  }

  private getRateByFilter(stats: QuizStats[], questionType?: QuestionType, successFilter: Predicate<QuestionStats> = question => question.success) {
    let result = this.average(stats.flatMap(quiz => quiz.questionsStats
      .filter(question => this.isQuestionOfType(question, questionType))
      .map(question => successFilter(question) ? 1 : 0)));
    return result ? result * 100 : -1;
  }

  private sum(array: number[]) {
    return array.reduce((acc, c) => acc + c, 0);
  }

  private average(array: number[]) {
    return array.length === 0 ? undefined : this.sum(array) / array.length;
  }
}


