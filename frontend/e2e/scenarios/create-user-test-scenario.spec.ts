import {expect, test} from "@playwright/test";
import {testUrl} from "e2e/e2e.config";
import {ProfilesFixture} from "../../src/app/profiles/profiles.fixture";
import {AdminPatientsFixture} from "../../src/app/admin/pages/patients/admin-patients.fixture";
import {PatientFixture} from "../../src/app/admin/pages/patient/patient.fixture";


// This file is here to test the playwright integration.
test.describe("Create user test display", () => {
  test("Create user test", async ({page}) => {
    // Fixture definitions
    const profilesFixture = new ProfilesFixture(page);
    const adminPatientsFixture = new AdminPatientsFixture(page);
    const patientFixture = new PatientFixture(page);

    // Items definitions
    const adminButton = profilesFixture.getAdminButtonFixture().getAdminButton();
    const createUserButton = adminPatientsFixture.getCreateUserButton();
    const createUserTitle = patientFixture.getPatientHeaderFixture().getCreateUserTitle();
    const lastNameInput = patientFixture.getPatientHeaderFixture().getLastNameInput();
    const firstNameInput = patientFixture.getPatientHeaderFixture().getFirstNameInput();
    const birthDateInput = patientFixture.getPatientHeaderFixture().getBirthDateInput();
    const validateButton = patientFixture.getPatientHeaderFixture().getValidateButton();
    const dementiaInput = patientFixture.getPatientSettings().getDementiaLevel();
    const fontSizeInput = patientFixture.getPatientSettings().getFontSize();
    const removeWrongAnswersInput = patientFixture.getPatientSettings().getRemoveWrongAnswers();
    const fiftyFiftyInput = patientFixture.getPatientSettings().getFiftyFifty();
    const audioQuestionsInput = patientFixture.getPatientSettings().getAudioQuestions();


    await test.step("Create User Navigation", async () => {
      // Admin page navigation
      await page.goto(testUrl);
      await expect(adminButton).toBeVisible();

      // Admin patients page navigation
      await adminButton.click();
      await expect(page).toHaveURL("http://localhost:4200/admin/patients");
      await expect(createUserButton).toBeVisible();

      // Create User page navigation
      await createUserButton.click();
    });

    await test.step("User form presence verification", async () => {
      await expect(createUserTitle).toBeVisible();
      await expect(lastNameInput).toBeVisible();
      await expect(firstNameInput).toBeVisible();
      await expect(birthDateInput).toBeVisible();
      await expect(validateButton).toBeVisible();
    });

    await test.step("Create User", async () => {
      await lastNameInput.fill("Dupont");
      await firstNameInput.fill("Bernard");
      await birthDateInput.fill("1950-05-11");
      await validateButton.click();
    });

    await test.step("User settings presence verification", async () => {
      await expect(dementiaInput).toBeVisible();
      await expect(fontSizeInput).toBeVisible();
      await expect(removeWrongAnswersInput).toBeVisible();
      await expect(fiftyFiftyInput).toBeVisible();
      await expect(fontSizeInput).toBeVisible();
      await expect(audioQuestionsInput).toBeVisible();
    });

    await test.step("Define user parameters", async () => {
      await dementiaInput.fill("2");
      await fontSizeInput.fill("1.25");
    });
  });
});
