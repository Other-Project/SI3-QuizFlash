import {Dementia} from "../models/dementia.models";
import {AccessRestriction} from "../models/access-restriction.models";
import {Patient} from "../models/patient.models";

export const USER_MARTINE: Patient = {
  id: 1716802568716,
  access: AccessRestriction.User,

  pictureUrl: "assets/users/martine.jpg",
  firstname: "Martine",
  lastname: "Dupont",
  age: 70,
  dementiaLevel: Dementia.Intermediate,
  fontSize: 2,
  hobbies: ["culture", "famille", "theatre"],

  removeAnswers: false,
  answerHint: false,
  numberOfQuestion: 3,
  replayAtEnd: false,
  automatedSkip: true,

  soundQuestion: true,
  autoStartAudio: true
}
