import {User} from "../models/user.models";
import {Dementia} from "../models/dementia.models";

export const USER_FRANCESCU: User = {
  id: "e1840a2b-9e61-4c2f-a002-d683b806ce3a",
  pictureUrl: "assets/users/francescu.jpg",
  firstname: "Francescu",
  lastname: "Luciani",
  age: 95,
  dementiaLevel: Dementia.Mild,
  fontSize: 1,
  hobbies: ["peche", "television"],

  automatedSkip: false,
  showIncorrectResponse: true,
  answerHint: true,

  soundQuestion: false,
  autoStartAudio: false
}
