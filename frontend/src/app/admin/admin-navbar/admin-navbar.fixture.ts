import {E2EComponentFixture} from "e2e/e2e-component.fixture";

export class AdminNavbarFixture extends E2EComponentFixture {
  getQuizzes() {
    return this.page.getByText("Quizz", {exact: true});
  }
}
