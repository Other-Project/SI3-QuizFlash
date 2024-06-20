import {Genders} from "../models/genders.model";
import {faBug, faMars, faVenus} from "@fortawesome/free-solid-svg-icons";

export function getDefaultProfilePicture(gender: Genders | undefined) {
  return (!gender || gender == Genders.MALE) ? "/assets/male-profile-picture.png"
    : "/assets/female-profile-picture.webp";
}

export function getFaIcon(gender: Genders) {
  switch (gender) {
    case Genders.MALE:
      return faVenus;
    case Genders.FEMALE:
      return faMars;
    default:
      return faBug;
  }
}
