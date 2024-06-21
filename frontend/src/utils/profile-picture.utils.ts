import {Genders} from "../models/genders.model";
import {faBug, faMars, faVenus} from "@fortawesome/free-solid-svg-icons";

export function getDefaultProfilePicture(gender: Genders | undefined) {
  switch (gender) {
    case Genders.FEMALE:
      return "/assets/female-profile-picture.webp";
    case Genders.OTHER:
      return "/assets/default-profile-picture.jpg";
    case Genders.MALE:
    default:
      return "/assets/male-profile-picture.png";
  }
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
