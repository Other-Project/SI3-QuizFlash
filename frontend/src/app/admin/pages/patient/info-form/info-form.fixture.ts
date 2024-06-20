import {E2EComponentFixture} from "e2e/e2e-component.fixture";

export class PatientInfoFormFixture extends E2EComponentFixture {
  getLastNameInput() {
    return this.page.getByLabel("Nom :", {exact: true});
  }

  getFirstNameInput() {
    return this.page.getByLabel("Prénom :", {exact: true});
  }

  getBirthDateInput() {
    return this.page.getByLabel("Date de naissance :", {exact: true});
  }

  getValidateButton() {
    return this.page.getByRole("button", {name: "Valider"});
  }

  getProfilePictureInput() {
    return this.page.locator("app-image-input input");
  }

  getGenderSelect() {
    return this.page.getByLabel("Genre :");
  }
}
