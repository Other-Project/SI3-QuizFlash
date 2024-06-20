import {E2EComponentFixture} from "../../../../../e2e/e2e-component.fixture";

export class QuestionFixture extends E2EComponentFixture {
  getQuestionTitle() {
    return this.page.locator("question-section").getByRole("paragraph").innerText();
  }
}
