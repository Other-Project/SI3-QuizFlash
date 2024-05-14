export interface Attempt {
  attemptId?: string;
  chosenAnswersId: string;
  timeSpent: number;
  answerHint: boolean;
  hiddenAnswers: string[];
}
