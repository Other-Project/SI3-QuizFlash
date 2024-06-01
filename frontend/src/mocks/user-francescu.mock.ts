import {Dementia} from "../models/dementia.models";
import {AccessRestriction} from "../models/access-restriction.models";
import {Patient} from "../models/patient.models";

export const USER_FRANCESCU: Patient = {
  id: 1716802549303,
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
  automatedSkip: false,

  soundQuestion: false,
  autoStartAudio: false
}
