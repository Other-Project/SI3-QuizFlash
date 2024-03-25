import {Dementia} from "./dementia.models";

export interface User {
  id: string;

  // Info
  lastname: string;
  firstname: string;
  age: number;
  hobbies: string[];
  pictureUrl?: string;

  // Global settings
  dementiaLevel: Dementia;
  fontSize: number;
  automatedSkip: boolean;
  showIncorrectResponse: boolean;
  answerHint: boolean;
  numberOfQuestion: number;

  // Sound settings
  soundQuestion: boolean;
  autoStartAudio: boolean;
}
