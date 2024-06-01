import {AccessRestriction} from "./access-restriction.models";

export interface User {
  id: number;
  access: AccessRestriction;

  // Info
  lastname: string;
  firstname: string;
  age: number;
  pictureUrl?: string;
}
