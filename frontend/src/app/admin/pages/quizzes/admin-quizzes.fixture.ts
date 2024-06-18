import {E2EComponentFixture} from "e2e/e2e-component.fixture";
import {AdminQuizFixture} from "./quiz/admin-quiz.fixture";

export class AdminQuizzesFixture extends E2EComponentFixture {
  getCreateQuizButton() {
    return this.page.getByRole("button", {name: "Créer un quiz", exact: true});
  }

  getAdminQuizFixture() {
    return new AdminQuizFixture(this.page);
  }
}
