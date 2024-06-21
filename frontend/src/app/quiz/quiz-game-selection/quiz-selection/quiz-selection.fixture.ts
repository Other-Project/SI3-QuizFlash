import {E2EComponentFixture} from "../../../../../e2e/e2e-component.fixture";
import {getButtonByText} from "../../../../../e2e/e2e.utils";

export class QuizSelectionFixture extends E2EComponentFixture {

  async getQuizButton(text: string) {
    return getButtonByText(this.page, text, "app-quiz-selection");
  }
}
