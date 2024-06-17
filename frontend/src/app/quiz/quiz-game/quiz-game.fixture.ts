import {E2EComponentFixture} from "e2e/e2e-component.fixture";
import {expect} from "@playwright/test";
import {QuestionFixture} from "./question-section/question-section.fixture";
import {QuestionResultFixture} from "./question-result/question-result.fixture";
import {AnswersFixture} from "./answers/answers.fixture";
import {SoundSettingsFixture} from "./sound-settings/sound-settings.fixture";

export class QuizGameFixture extends E2EComponentFixture {
  getSoundSettingsFixture() {
    return new SoundSettingsFixture(this.page);
  }

  getQuestionFixture() {
    return new QuestionFixture(this.page);
  }

  getQuestionResultFixture() {
    return new QuestionResultFixture(this.page);
  }

  getAnswersFixture() {
    return new AnswersFixture(this.page);
  }

  async isFinishScreen() {
    await expect(this.page.getByText("Vous avez terminé")).toBeVisible();
  }

  getGoBackToMenuButton() {
    return this.page.getByRole("button", {name: "Revenir au menu"});
  }
}
