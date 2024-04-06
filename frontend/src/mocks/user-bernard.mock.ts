import {Dementia} from "../models/dementia.models";
import {AccessRestriction} from "../models/access-restriction.models";
import {Patient} from "../models/patient.models";

export const USER_BERNARD: Patient = {
  id: "98f9f0da-f011-431a-9361-482ab17f8561",
  access: AccessRestriction.User,

  pictureUrl: "assets/users/bernard.jpg",
  firstname: "Bernard",
  lastname: "Martin",
  age: 85,
  dementiaLevel: Dementia.High,
  fontSize: 1.25,
  hobbies: ["peinture", "lecture"],

  automatedSkip: true,
  showIncorrectResponse: false,
  answerHint: false,
  numberOfQuestion: 3,
  replayAtEnd: false,

  soundQuestion: false,
  autoStartAudio: false
}
