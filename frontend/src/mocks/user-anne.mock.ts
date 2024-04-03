import {AccessRestriction} from "../models/access-restriction.models";
import {Admin} from "../models/admin.models";

export const USER_ANNE: Admin = {
  id: "e1840a2b-9e61-4c2f-a002-d683b806ce3a",
  access: AccessRestriction.Admin,

  pictureUrl: "assets/users/anne.jpg",
  firstname: "Anne",
  lastname: "Petit",
  age: 40,
  password: ""
};
