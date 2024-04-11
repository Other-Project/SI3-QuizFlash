import {Injectable, Predicate} from "@angular/core";
import {QuizStats} from "../models/quiz-stats.model";
import {STATISTICS} from "../mocks/statistics.mock";
import {QuestionStats} from "../models/question-stats.model";
import {GraphType} from "../models/graph-type.model";
import {QuestionType} from "../models/question-type.models";

@Injectable({
  providedIn: "root"
})

export class StatisticsService {
  quizStatistics: QuizStats[] = STATISTICS;

  constructor() {
  }

  public static getQuestionType(questionType: string): QuestionType | undefined {
    return questionType as unknown as QuestionType;
  }

  private isQuestionOfType(question: QuestionStats, questionType?: QuestionType) {
    return !questionType || question.questionType == questionType;
  }

  private quizStatsContainsType(quizStats: QuizStats, questionType?: QuestionType) {
    return quizStats.questionsStats.some(question => this.isQuestionOfType(question, questionType));
  }

  getPatientQuizWithType(patientId: string, questionType?: QuestionType) {
    return this.quizStatistics.filter(stat => stat.userId == patientId && this.quizStatsContainsType(stat, questionType));
  }

  private getRateByFilter(stats: QuizStats[], questionType?: QuestionType, successFilter: Predicate<QuestionStats> = question => question.success) {
    if (this.quizStatistics.length == 0)
      return -1;

    const result = stats.reduce((accumulator, current) => {
      let questions = current.questionsStats.filter(question => this.isQuestionOfType(question, questionType));
      accumulator.questionCount += questions.length;
      accumulator.filterCount += questions.filter(successFilter).length;
      return accumulator;
    }, {questionCount: 0, filterCount: 0});

    if (result.questionCount == 0)
      return -1;

    return this.roundUp(result.filterCount / result.questionCount) * 100;
  }

  getAllQuizzesAnswerHintRate(patientId: string, questionType?: QuestionType) {
    const patientStats = this.getPatientQuizWithType(patientId, questionType);
    return this.getRateByFilter(patientStats, questionType, question => question.answerHint);
  }

  getAllQuizzesSuccessRate(patientId: string, questionType?: QuestionType) {
    const patientStats = this.getPatientQuizWithType(patientId, questionType);

    if (patientStats.length == 0)
      return -1;

    return this.getRateByFilter(patientStats, questionType);
  }

  getAllQuizzesGraphData(patientId: string, questionType?: QuestionType): [string[], number[]] {
    const patientStats = this.getPatientQuizWithType(patientId, questionType);
    return [patientStats.map((stat) => stat.quizId), patientStats.map((stat) => this.getRateByFilter([stat], questionType))]
  }

  getQuizGraphData(patientId: string, graphType: GraphType, quizId: string, questionType?: QuestionType) {
    if (graphType == GraphType.TRIES)
      return this.getQuizTriesGraphData(patientId, quizId, questionType);
    else return this.getTimeQuizGraphData(patientId, quizId, questionType);
  }

  getQuizTriesGraphData(patientId: string, quizId: string, questionType?: QuestionType): [string[], number[]] {
    const patientStats = this.quizStatistics.filter(stat => stat.userId == patientId && quizId == stat.quizId && stat.questionsStats.some(question => this.isQuestionOfType(question, questionType)));
    return [patientStats.map((stat) => stat.quizId), patientStats.map((stat) => this.getRateByFilter([stat], questionType))]
  }

  getTimeQuizGraphData(patientId: string, quizId: string, questionType?: QuestionType): [string[], number[]] {
    const questionTimeMap: { [questionId: string]: { questionCount: number, totalSpentTime: number } } = {};

    const patientStats = this.getPatientQuizWithType(patientId, questionType)
      .filter(stat => !quizId || stat.quizId == quizId);

    for (let stat of patientStats) {
      for (let question of stat.questionsStats) {
        if (this.isQuestionOfType(question, questionType)) {
          if (!questionTimeMap[question.questionId]) {
            questionTimeMap[question.questionId] = {questionCount: 1, totalSpentTime: question.timeSpent};
          } else {
            questionTimeMap[question.questionId].totalSpentTime += question.timeSpent;
            questionTimeMap[question.questionId].questionCount++;
          }
        }
      }
    }

    const questionIds: string[] = [];
    const averageTimes: number[] = [];

    for (const questionId in questionTimeMap) {
      const averageTime = questionTimeMap[questionId].totalSpentTime / questionTimeMap[questionId].questionCount;
      questionIds.push(questionId);
      averageTimes.push(averageTime);
    }

    return [questionIds, averageTimes];
  }

  getQuizSuccessRate(patientId: string, quizId: string, questionType?: QuestionType) {
    const patientStats = this.quizStatistics.filter(stat => stat.userId == patientId && stat.quizId == quizId);

    return this.getRateByFilter(patientStats, questionType);
  }

  private roundUp(value: number) {
    return Math.round(value * 10) / 10;
  }

  private getTimeDataQuizStats(stats: QuizStats[], questionType?: QuestionType) {
    let totalTimeForQuestion = 0;
    let numberOfQuestion = 0;

    stats.forEach(stat => {
      stat.questionsStats.forEach(question => {
        if (this.isQuestionOfType(question, questionType)) {
          totalTimeForQuestion += question.timeSpent;
          numberOfQuestion += 1;
        }
      });
    });

    return [this.roundUp(totalTimeForQuestion), (numberOfQuestion == 0) ? 0 : this.roundUp(totalTimeForQuestion / numberOfQuestion)];
  }

  getTimeDataForQuiz(patientId: string, quizId: string, questionType?: QuestionType) {
    const patientStats = this.quizStatistics.filter(stat => stat.userId == patientId && stat.quizId == quizId);
    return this.getTimeDataQuizStats(patientStats, questionType);
  }
}


