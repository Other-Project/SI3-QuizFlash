import {E2EComponentFixture} from "e2e/e2e-component.fixture";
import {expect} from "@playwright/test";

export class SoundSettingsFixture extends E2EComponentFixture {
  getSwitchToQuizButton() {
    return this.page.getByRole("button", {name: "Passer au Quiz"});
  }

  async checkIsVisible() {
    await expect(this.page.getByText("Réglage du volume :")).toBeVisible();
  }
}
