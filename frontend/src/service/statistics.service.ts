import {Injectable, Predicate} from "@angular/core";
import {QuizStats} from "../models/quiz-stats.model";
import {STATISTICS} from "../mocks/statistics.mock";
import {QuestionStats} from "../models/question-stats.model";
import {QuestionType} from "../models/question-type.models";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: "root"})
export class StatisticsService {
  quizStatistics: QuizStats[] = STATISTICS;

  userQuizStats: QuizStats[] = [];
  userQuizStats$: BehaviorSubject<QuizStats[] | []> = new BehaviorSubject<QuizStats[] | []>(this.userQuizStats);

  constructor() {
  }

  /*****************
   * STATISTICS *
   * ****************/

  getAnswerHintRate(patientId: string, quizId?: string, questionType?: QuestionType) {
    return this.getRateByFilter(this.getPatientQuizzes(patientId, questionType, quizId), questionType, question => question.attempts.some(attempt => attempt.answerHint));
  }

  getSuccessRate(patientId: string, quizId?: string, questionType?: QuestionType) {
    return this.getRateByFilter(this.getPatientQuizzes(patientId, undefined, quizId), questionType);
  }

  getTime(patientId: string, quizId: string, questionType?: QuestionType) {
    return this.getTimeDataQuizStats(this.getPatientQuizzes(patientId, undefined, quizId), questionType);
  }

  getSuccessRatePerTry(patientId: string, quizId?: string, questionType?: QuestionType): [string[], number[]] {
    const patientStats = this.getPatientQuizzes(patientId, questionType, quizId);
    return [patientStats.map(stat => stat.quizId), patientStats.map(stat => this.getRateByFilter([stat], questionType))];
  }

  getTimePerQuestion(patientId: string, quizId: string, questionType?: QuestionType): [string[], number[]] {
    let result = this.getAccumulateQuestionStats(patientId, quizId, questionType);
    return [Object.keys(result), Object.values(result).map(question => this.average(question.flatMap(q => q.attempts.map(attempt => attempt.timeSpent))) ?? 0)];
  }

  getTimePerTries(patientId: string, quizId?: string, questionType?: QuestionType): [string[], number[]] {
    const patientStats = this.getPatientQuizzes(patientId, questionType, quizId);
    return [patientStats.map(stat => stat.quizId), patientStats.map(stat => this.sum(stat.questionsStats.flatMap(q => q.attempts.map(attempt => attempt.timeSpent))))];
  }

  getSuccessRatePerQuestion(patientId: string, quizId: string, questionType?: QuestionType): [string[], number[]] {
    let result = this.getAccumulateQuestionStats(patientId, quizId, questionType);
    return [Object.keys(result), Object.values(result).map(question => this.questionSuccessRate(question) ?? 0)];
  }

  /**************
   * HISTORY *
   **************/

  getUserHistory(userId: string) {
    this.userQuizStats = this.quizStatistics.filter(statistic => statistic.userId == userId);
    this.userQuizStats$.next(this.userQuizStats);
  }

  /*********
   * UTILS *
   *********/

  private questionSuccessRate(questionStats: QuestionStats[]) {
    let result = this.average(questionStats.map(question => question.success ? 1 : 0));
    return result ? result * 100 : undefined;
  }

  private getAccumulateQuestionStats(patientId: string, quizId: string, questionType?: QuestionType): Record<string, QuestionStats[]> {
    return this.getPatientQuizzes(patientId, questionType, quizId)
      .flatMap(quiz => quiz.questionsStats.filter(question => this.isQuestionOfType(question, questionType)))
      .reduce((groups, question) => {
        (groups[question.questionId] ||= []).push(question);
        return groups;
      }, {} as Record<string, QuestionStats[]>);
  }

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
    return result != undefined ? result * 100 : -1;
  }

  private getTimeDataQuizStats(stats: QuizStats[], questionType?: QuestionType) {
    let timeSpent = stats.flatMap(stat => stat.questionsStats
      .filter(question => this.isQuestionOfType(question, questionType))
      .flatMap(q => q.attempts.map(attempt => attempt.timeSpent)));
    return [this.sum(timeSpent), this.average(timeSpent) ?? 0];
  }

  private sum(array: number[]) {
    return array.reduce((acc, c) => acc + c, 0);
  }

  private average(array: number[]) {
    return array.length === 0 ? undefined : this.sum(array) / array.length;
  }
}
