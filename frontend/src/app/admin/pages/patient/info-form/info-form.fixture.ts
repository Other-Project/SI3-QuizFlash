import {E2EComponentFixture} from "../../../../../../e2e/e2e-component.fixture";

export class PatientInfoFormFixture extends E2EComponentFixture {
  getLastNameInput() {
    return this.page.locator("label").filter({hasText: "Nom :", hasNotText: "Pré"});
  }

  getFirstNameInput() {
    return this.page.locator("label").filter({hasText: "Prénom :"});
  }

  getBirthDateInput() {
    return this.page.locator("label").filter({hasText: "Date de naissance :"});
  }

  getValidateButton() {
    return this.page.getByRole("button", {name: "Valider"});
  }

  getProfilePictureInput() {
    return this.page.locator("app-image-input input");
  }

  async getProfilePictureImage() {
    return await (this.page.locator("app-image-input img")).getAttribute("src");
  }

  async getCreatedUserProfilePicture() {
    return await this.page.locator("app-image img").getAttribute("src");
  }

  getGenderSelect() {
    return this.page.getByLabel("Genre :");
  }
}
