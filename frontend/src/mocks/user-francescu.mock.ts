import {Dementia} from "../models/dementia.models";
import {AccessRestriction} from "../models/access-restriction.models";
import {Patient} from "../models/patient.models";

export const USER_FRANCESCU: Patient = {
  id: "e1840a2b-9e61-4c2f-a002-d683b806ce3a",
  access: AccessRestriction.User,

  pictureUrl: "assets/users/francescu.jpg",
  firstname: "Francescu",
  lastname: "Luciani",
  age: 95,
  dementiaLevel: Dementia.Mild,
  fontSize: 1,
  hobbies: ["peche", "television"],

  replayAtEnd: true,
  removeAnswers: false,
  answerHint: true,
  numberOfQuestion: 3,
  automatedSkip: true,

  soundQuestion: false,
  autoStartAudio: false
}
