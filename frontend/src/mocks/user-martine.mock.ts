import {Dementia} from "../models/dementia.models";
import {AccessRestriction} from "../models/access-restriction.models";
import {Patient} from "../models/patient.models";
import {Genders} from "../models/genders.model";

export const USER_MARTINE: Patient = {
  id: "134b849f-fd4b-4b13-b377-f283b117365d",
  access: AccessRestriction.User,

  pictureUrl: "assets/users/martine.jpg",
  firstname: "Martine",
  lastname: "Dupont",
  gender: Genders.FEMALE,
  birthDate: "1953-09-30",
  dementiaLevel: Dementia.Intermediate,
  fontSize: 1.5,
  hobbies: ["culture", "famille", "théâtre"],

  removeAnswers: false,
  answerHint: false,
  numberOfQuestion: 3,
  replayAtEnd: false,
  automatedSkip: true,

  soundQuestion: true,
  autoStartAudio: true
}
