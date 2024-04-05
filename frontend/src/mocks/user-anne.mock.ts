import {AccessRestriction} from "../models/access-restriction.models";
import {Admin} from "../models/admin.models";

export const USER_ANNE: Admin = {
  id: "171bcab8-302a-4229-8779-35ba7ea3dafd",
  access: AccessRestriction.Admin,

  pictureUrl: "assets/users/anne.jpg",
  firstname: "Anne",
  lastname: "Petit",
  age: 40,
  password: ""
};
