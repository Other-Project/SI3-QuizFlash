import {E2EComponentFixture} from "e2e/e2e-component.fixture";

export class AdminButtonFixture extends E2EComponentFixture {
  getAdminButton() {
    return this.page.getByText("Se connecter en tant qu'administrateur");
  }
}
