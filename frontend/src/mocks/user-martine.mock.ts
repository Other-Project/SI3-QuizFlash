import {User} from "../models/user.models";
import {Dementia} from "../models/dementia.models";

export const USER_MARTINE: User = {
  id: "134b849f-fd4b-4b13-b377-f283b117365d",
  pictureUrl: "assets/users/martine.jpg",
  firstname: "Martine",
  lastname: "Dupont",
  age: 70,
  dementiaLevel: Dementia.Intermediate,
  fontSize: 2,
  hobbies: ["culture", "famille", "theatre"],

  automatedSkip: false,
  showIncorrectResponse: false,
  answerHint: false,
  numberOfQuestion: 3,

  soundQuestion: true,
  autoStartAudio: true
}
