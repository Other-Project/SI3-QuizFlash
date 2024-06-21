import {AccessRestriction} from "../models/access-restriction.models";
import {Admin} from "../models/admin.models";
import {Genders} from "../models/genders.model";

export const USER_ANNE: Admin = {
  id: "1715587135341",
  access: AccessRestriction.Admin,

  pictureUrl: "assets/users/anne.jpg",
  firstname: "Anne",
  lastname: "Petit",
  gender: Genders.FEMALE,
  password: "admin"
};
