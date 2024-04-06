import {Dementia} from "./dementia.models";
import {User} from "./user.models";

export interface Patient extends User {
  hobbies: string[];

  // Global settings
  dementiaLevel: Dementia;
  fontSize: number;
  removeAnswers: boolean;
  showIncorrectResponse: boolean;
  answerHint: boolean;
  numberOfQuestion: number;
  replayAtEnd: boolean;

  // Sound settings
  soundQuestion: boolean;
  autoStartAudio: boolean;
}
