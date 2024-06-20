import {E2EComponentFixture} from "../../../../../../e2e/e2e-component.fixture";
import {AdminQuestionFixture} from "./question/admin-question.fixture";

export class AdminQuizFixture extends E2EComponentFixture {
  getQuestionFixture(n: number) {
    return new AdminQuestionFixture(this.page.locator("app-admin-question").nth(n - 1));
  }

  getQuizTitlePlaceHolder() {
    return this.page.getByPlaceholder("Entrez un titre", {exact: true});
  }

  getQuizPicture() {
    return this.page.locator("app-image-input input");
  }

  getTagMenu() {
    return this.page.getByText("Sélectionnez des tags", {exact: true});
  }

  getFishingTag() {
    return this.page.getByText("pêche", {exact: true});
  }

  getCreateQuizButton() {
    return this.page.getByRole("button", {name: "Créer", exact: true});
  }

  getCreateQuestionButton() {
    return this.page.getByRole("button", {name: "Ajouter une question", exact: true});
  }

  getSaveButton() {
    return this.page.getByRole("button", {name: "Sauvegarder", exact: true});
  }

  async getNumberOfQuestions() {
    const locators = await this.page.locator("app-admin-question").all();
    return locators.length;
  }
}
