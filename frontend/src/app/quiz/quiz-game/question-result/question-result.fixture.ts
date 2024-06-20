import {E2EComponentFixture} from "../../../../../e2e/e2e-component.fixture";
import {expect} from "@playwright/test";

export class QuestionResultFixture extends E2EComponentFixture {
  getNextButton() {
    return this.page.getByRole("button", {name: "Question suivante"}).first();
  }

  getFinishButton() {
    return this.page.getByRole("button", {name: "Finir le quiz"}).first();
  }

  async checkIsCorrectScreen() {
    await expect(this.page.getByText("Bravo, tu as raison, la bonne réponse était :", {exact: true})).toBeVisible();
  }

  async checkIsIncorrectScreen() {
    await expect(this.page.getByText("La bonne réponse était :", {exact: true})).toBeVisible();
  }
}
