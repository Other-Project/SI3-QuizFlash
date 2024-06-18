import {E2EComponentFixture} from "e2e/e2e-component.fixture";
import {getButtonByText} from "../../../../e2e/e2e.utils";

export class ProfileListFixture extends E2EComponentFixture {
  async getUserButton(name: string) {
    return getButtonByText(this.page, name, "app-profile-list");
  }
}
