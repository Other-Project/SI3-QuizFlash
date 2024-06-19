import {expect, test} from "@playwright/test";
import {testUrl} from "../e2e.config";
import {ProfilesFixture} from "../../src/app/profiles/profiles.fixture";
import {AdminPatientsFixture} from "../../src/app/admin/pages/patients/admin-patients.fixture";
import {PatientFixture} from "../../src/app/admin/pages/patient/patient.fixture";


// This file is here to test the playwright integration.
test.describe("Create user test display", () => {
  test("Create user test", async ({page}) => {
    await page.goto(testUrl);

    await test.step("Create User Navigation", async () => {
      const profilesFixture = new ProfilesFixture(page);

      const adminButton = profilesFixture.getAdminButtonFixture().getAdminButton();

      await expect(adminButton).toBeVisible();
      await adminButton.click();
      await expect(page).toHaveURL(`${testUrl}/admin/patients`);

      const adminPatientsFixture = new AdminPatientsFixture(page);
      const createUserButton = adminPatientsFixture.getCreateUserButton();
      await expect(createUserButton).toBeVisible();

      await createUserButton.click();
      await expect(page).toHaveURL(`${testUrl}/admin/patient`);
    });
    const patientFixture = new PatientFixture(page);

    const patientHeaderFixture = patientFixture.getPatientHeaderFixture();
    const createUserTitle = patientHeaderFixture.getCreateUserTitle();
    const lastNameInput = patientHeaderFixture.getLastNameInput();
    const firstNameInput = patientHeaderFixture.getFirstNameInput();
    const birthDateInput = patientHeaderFixture.getBirthDateInput();
    const validateButton = patientHeaderFixture.getValidateButton();

    const patientSettingsFixture = patientFixture.getPatientSettings();
    const dementiaInput = patientSettingsFixture.getDementiaLevel();
    const fontSizeInput = patientSettingsFixture.getFontSize();
    const removeWrongAnswersInput = patientSettingsFixture.getRemoveWrongAnswers();
    const fiftyFiftyInput = patientSettingsFixture.getFiftyFifty();
    const audioQuestionsInput = patientSettingsFixture.getAudioQuestions();

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
      await expect(audioQuestionsInput).toBeVisible();
    });

    await test.step("Define user parameters", async () => {
      await dementiaInput.fill("2");
      await fontSizeInput.fill("1.25");
      await expect(removeWrongAnswersInput).toBeChecked();
      await expect(fiftyFiftyInput).toBeChecked({checked: false});
      await expect(audioQuestionsInput).toBeChecked({checked: false});
    });
  });
});
