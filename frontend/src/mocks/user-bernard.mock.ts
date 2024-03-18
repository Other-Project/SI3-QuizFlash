import {User} from "../models/user.models";
import {Dementia} from "../models/dementia.models";

export const USER_BERNARD: User = {
  id: "98f9f0da-f011-431a-9361-482ab17f8561",
  firstname: "Bernard",
  lastname: "Martin",
  age: 85,
  dementiaLevel: Dementia.High,
  fontSize: 1.25,
  hobbies: ["peinture", "lecture"],

  automatedSkip: true,
  showIncorrectResponse: false,
  answerHint: false,

  soundQuestion: false,
  autoStartAudio: false
}
