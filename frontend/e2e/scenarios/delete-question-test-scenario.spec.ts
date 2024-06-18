import {expect, test} from "@playwright/test";
import {testUrl} from "../e2e.config";
import {ProfilesFixture} from "../../src/app/profiles/profiles.fixture";
import {AdminFixture} from "../../src/app/admin/admin.fixture";

test.describe("Delete a question display", () => {
  test("Delete a question", async ({page}) => {
    await page.goto(testUrl);

    const adminFixture = new AdminFixture(page);
    const adminQuizzesFixture = adminFixture.getAdminQuizzesFixture();
    await test.step("Delete a question navigation", async () => {
      const profilesFixture = new ProfilesFixture(page);

      const adminButton = profilesFixture.getAdminButtonFixture().getAdminButton();

      await expect(adminButton).toBeVisible();
      await adminButton.click();
      await expect(page).toHaveURL(`${testUrl}/admin/patients`);

      const quizzesButton = adminFixture.getAdminNavbarFixture().getQuizzes();
      await expect(quizzesButton).toBeVisible();
      await quizzesButton.click();
      await expect(page).toHaveURL(`${testUrl}/admin/quizzes`);


      const quizToTarget = adminQuizzesFixture.getAQuiz("Chansons Françaises");
      await quizToTarget.click();
    });

    await test.step("Delete the targeted question", async () => {
      const adminQuizFixture = adminQuizzesFixture.getAdminQuizFixture();
      let numberOfQuestionBeginning = await adminQuizFixture.getNumberOfQuestions();
      const questionFixture = adminQuizFixture.getQuestionFixture(1);
      const deleteButton = questionFixture.getDeleteQuestionButton();
      await deleteButton.click();
      let numberOfQuestionEnd = await adminQuizFixture.getNumberOfQuestions();

      expect(numberOfQuestionBeginning - numberOfQuestionEnd).toEqual(1);

      const quizSaveButton = adminQuizFixture.getSaveButton();
      await quizSaveButton.click();
      await page.pause();
    });
  });
});
