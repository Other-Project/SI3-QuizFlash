import {Injectable, Predicate} from "@angular/core";
import {QuizStats} from "../models/quiz-stats.model";
import {STATISTICS} from "../mocks/statistics.mock";
import {QuestionType} from "../models/question-type.models";
import {QuestionStats} from "../models/question-stats.model";

@Injectable({
  providedIn: "root"
})

export class StatisticsService {
  quizStatistics: QuizStats[] = STATISTICS;

  constructor() {
  }

  private getRateByFilter(stats: QuizStats[], patientId: string, filter: Predicate<QuestionStats>): number {
    const patientStats = stats.filter(stat => stat.userId == patientId);

    if (patientStats.length == 0)
      return 0;

    const result = stats.reduce((accumulator, current) => {
      accumulator.questionCount += current.questionsStats.length;
      accumulator.filterCount += current.questionsStats.filter(filter).length;
      return accumulator;
    }, {questionCount: 0, filterCount: 0});

    console.log(result);

    return Math.round(result.filterCount / result.questionCount * 100);
  }

  getAllQuizzesAnswerHintRate(patientId: string, questionType: string): number {
    return this.getRateByFilter(this.quizStatistics, patientId, question => question.assistedAnswer && question.questionType == (questionType == "all" ? question.questionType : parseInt(questionType)));
  }

  getAllQuizzesSuccessRate(patientId: string, questionType: string): number {
    return this.getRateByFilter(this.quizStatistics, patientId, question => question.success && question.questionType == (questionType == "all" ? question.questionType : parseInt(questionType)));
  }

  static getQuizStatSuccessRate(quizStat: QuizStats) {
    if (quizStat.questionsStats.length === 0)
      return 0;

    const successCount = quizStat.questionsStats.filter(question => question.success).length;
    return Math.round((successCount / quizStat.questionsStats.length) * 100);
  }

  //TODO GERER QUESTION TYPE
  getAllQuizzesGraphData(patientId: string, questionType: QuestionType | undefined): [string[], number[]] {
    const patientStats = this.quizStatistics.filter(stat => stat.userId == patientId);
    return [patientStats.map((stat) => stat.quizId), patientStats.map((stat) => StatisticsService.getQuizStatSuccessRate(stat))]
  }

  getQuizSuccessRate(patientId: string, quizId: string, questionType: string) {
    const patientStats = this.quizStatistics.filter(stat => stat.userId == patientId && stat.quizId == quizId);

    return this.getRateByFilter(patientStats, patientId, (question) => question.success && question.questionType == (questionType == "all" ? question.questionType : parseInt(questionType)));
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


