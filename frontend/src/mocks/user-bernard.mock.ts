import {Dementia} from "../models/dementia.models";
import {AccessRestriction} from "../models/access-restriction.models";
import {Patient} from "../models/patient.models";

export const USER_BERNARD: Patient = {
  id: "98f9f0da-f011-431a-9361-482ab17f8561",
  access: AccessRestriction.User,

  pictureUrl: "assets/users/bernard.jpg",
  firstname: "Bernard",
  lastname: "Martin",
  birthDate: "1939-06-14",
  dementiaLevel: Dementia.High,
  fontSize: 1.25,
  hobbies: ["peinture", "lecture"],

  removeAnswers: true,
  answerHint: false,
  numberOfQuestion: 3,
  replayAtEnd: false,
  automatedSkip: true,

  soundQuestion: false,
  autoStartAudio: false
}
