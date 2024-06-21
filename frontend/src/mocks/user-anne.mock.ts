import {AccessRestriction} from "../models/access-restriction.models";
import {Admin} from "../models/admin.models";
import {Genders} from "../models/genders.model";

export const USER_ANNE: Admin = {
  id: "b84cba22-6388-4d5c-8b05-dd9d8637b5b6",
  access: AccessRestriction.Admin,

  pictureUrl: "assets/users/anne.jpg",
  firstname: "Anne",
  lastname: "Petit",
  gender: Genders.FEMALE,
  password: "admin"
};
