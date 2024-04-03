import {User} from "./user.models";

export interface Admin extends User {
  password: string;
}
