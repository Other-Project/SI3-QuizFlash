import {E2EComponentFixture} from "e2e/e2e-component.fixture";

export class PatientHeaderFixture extends E2EComponentFixture {
  getCreateUserTitle() {
    return this.page.getByText("Création d'un nouvel utilisateur");
  }

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
    return this.page.locator("app-image-input#profile-picture input");
  }
}
