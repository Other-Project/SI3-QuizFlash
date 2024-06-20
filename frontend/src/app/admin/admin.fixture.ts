import {E2EComponentFixture} from "../../../e2e/e2e-component.fixture";
import {AdminNavbarFixture} from "./admin-navbar/admin-navbar.fixture";
import {AdminQuizzesFixture} from "./pages/quizzes/admin-quizzes.fixture";

export class AdminFixture extends E2EComponentFixture {
  getAdminNavbarFixture() {
    return new AdminNavbarFixture(this.page);
  }

  getAdminQuizzesFixture() {
    return new AdminQuizzesFixture(this.page);
  }
}
