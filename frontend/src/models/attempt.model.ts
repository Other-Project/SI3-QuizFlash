export interface Attempt {
  attemptId?: number;
  chosenAnswersId: number;
  timeSpent: number;
  answerHint: boolean;
  hiddenAnswers: number[];
}
