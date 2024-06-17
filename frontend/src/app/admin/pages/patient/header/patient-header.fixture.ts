import {E2EComponentFixture} from "e2e/e2e-component.fixture";

export class PatientHeaderFixture extends E2EComponentFixture {
  getCreateUserTitle() {
    return this.page.getByText("Création d'un nouvel utilisateur");
  }

  getLastNameInput() {
    return this.page.getByLabel("Nom :");
  }
}
