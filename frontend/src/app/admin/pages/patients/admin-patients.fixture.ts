import {E2EComponentFixture} from "../../../../../e2e/e2e-component.fixture";

export class AdminPatientsFixture extends E2EComponentFixture {
  getCreateUserButton() {
    return this.page.getByRole("button", {name: "Ajouter un utilisateur"});
  }
}
