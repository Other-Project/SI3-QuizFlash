import {E2EComponentFixture} from "../../../../../e2e/e2e-component.fixture";

export class AnswersFixture extends E2EComponentFixture {
  getAnswerButton(text: string) {
    return this.page.locator("answers-section").getByRole("button", {name: text}).first();
  }
}
