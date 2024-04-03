import {User} from "../models/user.models";
import {USER_MARTINE} from "./user-martine.mock";
import {USER_BERNARD} from "./user-bernard.mock";
import {USER_FRANCESCU} from "./user-francescu.mock";
import {USER_ANNE} from "./user-anne.mock";

export const USERS: User[] = [
  // Patient
  USER_MARTINE,
  USER_BERNARD,
  USER_FRANCESCU,

  // Admin
  USER_ANNE
]
