import {E2EComponentFixture} from "../../../../../../../e2e/e2e-component.fixture";

export class AdminQuestionFixture extends E2EComponentFixture {
  getQuestionTitlePlaceHolder() {
    return this.page.getByPlaceholder("Entrez la question", {exact: true});
  }

  getAddProposition() {
    return this.page.getByRole("button", {name: "Ajouter une proposition", exact: true});
  }

  getProposition(i: number) {
    return this.page.getByPlaceholder(`Entrez la proposition ${i}`, {exact: true});
  }

  getRightProposition(i: number) {
    return this.page.getByRole("radio").nth(i - 1);
  }

  getQuestionTypeMenu() {
    return this.page.getByRole("combobox");
  }

  getQuestionPicture() {
    return this.page.locator("app-image-input input");
  }

  getQuestionAudio() {
    return this.page.locator("app-file-input input");
  }

  getSaveQuestionButton() {
    return this.page.locator("app-button.save");
  }

  getSaveButtonIcon() {
    return this.getSaveQuestionButton().locator("fa-icon");
  }

  async isSaveButtonDisabled() {
    return await this.getSaveQuestionButton().getAttribute("ng-reflect-disabled");
  }

  getDeleteQuestionButton() {
    return this.page.locator("app-button.delete");
  }
}
