export interface Attempt {
  attemptId?: string;
  chosenAnswersId: number;
  timeSpent: number;
  answerHint: boolean;
  hiddenAnswers: number[];
}
