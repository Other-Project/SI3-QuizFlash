import {Dementia} from "../models/dementia.models";
import {AccessRestriction} from "../models/access-restriction.models";
import {Patient} from "../models/patient.models";
import {Genders} from "../models/genders.model";

export const USER_FRANCESCU: Patient = {
  id: "e1840a2b-9e61-4c2f-a002-d683b806ce3a",
  access: AccessRestriction.User,

  pictureUrl: "assets/users/francescu.jpg",
  firstname: "Francescu",
  lastname: "Luciani",
  gender: Genders.MALE,
  birthDate: "1929-01-04",
  dementiaLevel: Dementia.Mild,
  fontSize: 1,
  hobbies: ["pêche", "télévision"],

  replayAtEnd: true,
  removeAnswers: false,
  answerHint: true,
  numberOfQuestion: 3,
  automatedSkip: false,

  soundQuestion: false,
  autoStartAudio: false
}
