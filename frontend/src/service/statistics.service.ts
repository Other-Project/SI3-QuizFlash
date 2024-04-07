import {Injectable, Predicate} from "@angular/core";
import {QuizStats} from "../models/quiz-stats.model";
import {STATISTICS} from "../mocks/statistics.mock";
import {QuestionStats} from "../models/question-stats.model";
import {GraphType} from "../models/graph-type.model";

@Injectable({
  providedIn: "root"
})

export class StatisticsService {
  quizStatistics: QuizStats[] = STATISTICS;

  constructor() {
  }

  private getRateByFilter(stats: QuizStats[], patientId: string, questionFilter: Predicate<QuestionStats>, successFilter: Predicate<QuestionStats>): number {
    const patientStats = stats.filter(stat => stat.userId == patientId);

    if (patientStats.length == 0)
      return 0;

    const result = stats.reduce((accumulator, current) => {
      let questions = current.questionsStats.filter(questionFilter);
      accumulator.questionCount += questions.length;
      accumulator.filterCount += questions.filter(successFilter).length;
      return accumulator;
    }, {questionCount: 0, filterCount: 0});

    if (result.questionCount == 0)
      return -1;

    return this.roundUp(result.filterCount / result.questionCount) * 100;
  }

  getAllQuizzesAnswerHintRate(patientId: string, questionType: string): number {
    return this.getRateByFilter(this.quizStatistics, patientId, question => question.questionType == (questionType == "all" ? question.questionType : parseInt(questionType)), question => question.assistedAnswer);
  }

  getAllQuizzesSuccessRate(patientId: string, questionType: string): number {
    const patientStats = this.quizStatistics.filter(stat => stat.userId == patientId && stat.questionsStats.filter(question => question.questionType == (questionType == "all" ? question.questionType : parseInt(questionType))).length != 0);

    if (patientStats.length == 0)
      return -1;

    return this.getRateByFilter(patientStats, patientId, question => true, question => question.success)
  }

  getQuizStatSuccessRate(quizStat: QuizStats) {
    if (quizStat.questionsStats.length === 0)
      return 0;


    const successCount = quizStat.questionsStats.filter(question => question.success).length;
    return this.roundUp(successCount / quizStat.questionsStats.length) * 100;
  }

  getAllQuizzesGraphData(patientId: string, questionType: string): [string[], number[]] {
    const patientStats = this.quizStatistics.filter(stat => stat.userId == patientId && stat.questionsStats.filter(question => question.questionType == (questionType == "all" ? question.questionType : parseInt(questionType))).length != 0);
    return [patientStats.map((stat) => stat.quizId), patientStats.map((stat) => this.getQuizStatSuccessRate(stat))]
  }

  getQuizGraphData(patientId: string, quizId: string, questionType: string, graphType: GraphType): [string[], number[]] {
    if (graphType == GraphType.TRIES)
      return this.getQuizTriesGraphData(patientId, quizId, questionType);
    else return this.getTimeQuizGraphData(patientId, quizId, questionType);
  }

  getQuizTriesGraphData(patientId: string, quizId: string, questionType: string): [string[], number[]] {
    const patientStats = this.quizStatistics.filter(stat => stat.userId == patientId && (stat.quizId == quizId || quizId == "all") && stat.questionsStats.filter(question => questionType == "all" || question.questionType == parseInt(questionType)).length != 0);
    return [patientStats.map((stat) => stat.quizId), patientStats.map((stat) => this.getQuizStatSuccessRate(stat))]
  }

  getTimeQuizGraphData(patientId: string, quizId: string, questionType: string): [string[], number[]] {
    const questionTimeMap: { [questionId: string]: { questionCount: number, totalSpentTime: number } } = {};

    const patientStats = this.quizStatistics.filter(stat => stat.userId == patientId && (quizId == "all" || stat.quizId == quizId));

    for (let stat of patientStats) {
      for (let question of stat.questionsStats) {
        if (questionType == "all" || question.questionType == parseInt(questionType)) {
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
    console.log(questionTimeMap);
    console.log(questionIds, averageTimes);
    return [questionIds, averageTimes];
  }

  getQuizSuccessRate(patientId: string, quizId: string, questionType: string) {
    const patientStats = this.quizStatistics.filter(stat => stat.userId == patientId && stat.quizId == quizId);

    return this.getRateByFilter(patientStats, patientId, question => question.questionType == (questionType == "all" ? question.questionType : parseInt(questionType)), (question) => question.success);
  }

  private roundUp(value: number) {
    return Math.round(value * 10) / 10;
  }

  private getTimeDataQuizStats(stats: QuizStats[], questionType: string): [number, number] {
    let totalTimeForQuestion = 0;
    let numberOfQuestion = 0;

    stats.forEach(stat => {
      stat.questionsStats.forEach(question => {
        if (question.questionType == parseInt(questionType) || questionType == "all") {
          totalTimeForQuestion += question.timeSpent;
          numberOfQuestion += 1;
        }
      });
    });

    return [this.roundUp(totalTimeForQuestion), (numberOfQuestion == 0) ? 0 : this.roundUp(totalTimeForQuestion / numberOfQuestion)];
  }


  getTimeDataForQuiz(patientId: string, quizId: string, questionType: string) {
    const patientStats = this.quizStatistics.filter(stat => stat.userId == patientId && stat.quizId == quizId);
    return this.getTimeDataQuizStats(patientStats, questionType);
  }
}


