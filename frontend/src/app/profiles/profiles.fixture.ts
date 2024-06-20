import {E2EComponentFixture} from "../../../e2e/e2e-component.fixture";
import {AdminButtonFixture} from "./admin-button/admin-button.fixture";

export class ProfilesFixture extends E2EComponentFixture {
  getAdminButtonFixture() {
    return new AdminButtonFixture(this.page);
  }
}
