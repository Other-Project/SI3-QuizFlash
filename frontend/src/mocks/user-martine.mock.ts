import {Dementia} from "../models/dementia.models";
import {AccessRestriction} from "../models/access-restriction.models";
import {Patient} from "../models/patient.models";

export const USER_MARTINE: Patient = {
  id: "134b849f-fd4b-4b13-b377-f283b117365d",
  access: AccessRestriction.User,

  pictureUrl: "assets/users/martine.jpg",
  firstname: "Martine",
  lastname: "Dupont",
  age: 70,
  dementiaLevel: Dementia.Intermediate,
  fontSize: 2,
  hobbies: ["culture", "famille", "theatre"],

  removeAnswers: false,
  showIncorrectResponse: false,
  answerHint: false,
  numberOfQuestion: 3,
  replayAtEnd: true,

  soundQuestion: true,
  autoStartAudio: true
}
