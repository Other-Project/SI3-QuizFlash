import {AccessRestriction} from "./access-restriction.models";
import {Genders} from "./genders.model";

export interface User {
  id: string;
  access: AccessRestriction;

  // Info
  lastname: string;
  firstname: string;
  gender: Genders;
  pictureUrl?: string;
}
