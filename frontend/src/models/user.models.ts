import {AccessRestriction} from "./access-restriction.models";

export interface User {
  id: string;
  access: AccessRestriction;

  // Info
  lastname: string;
  firstname: string;
  pictureUrl?: string;
}
