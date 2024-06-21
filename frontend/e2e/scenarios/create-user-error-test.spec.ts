import {expect, test} from "@playwright/test";
import {testUrl} from "../e2e.config";
import {ProfilesFixture} from "../../src/app/profiles/profiles.fixture";
import {AdminPatientsFixture} from "../../src/app/admin/pages/patients/admin-patients.fixture";
import {PatientFixture} from "../../src/app/admin/pages/patient/patient.fixture";

test.describe("Create user with errors test display", () => {
  test("Create user with errors test", async ({page}) => {
    await page.goto(testUrl);

    await test.step("Create User errors Navigation", async () => {
      const profilesFixture = new ProfilesFixture(page);

      const adminButton = profilesFixture.getAdminButtonFixture().getAdminButton();
      const firstProfile = profilesFixture.getFirstProfile();

      await expect(firstProfile).toBeVisible({timeout: 50000});
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

    const patientInfoFormFixture = patientFixture.getPatientInfoFormFixture();
    const profilePictureInput = patientInfoFormFixture.getProfilePictureInput();
    const lastNameInput = patientInfoFormFixture.getLastNameInput();
    const firstNameInput = patientInfoFormFixture.getFirstNameInput();
    const birthDateInput = patientInfoFormFixture.getBirthDateInput();
    const genderSelect = patientInfoFormFixture.getGenderSelect();
    const validateButton = patientInfoFormFixture.getValidateButton();

    await test.step("User form presence verification", async () => {
      await expect(lastNameInput).toBeVisible();
      await expect(firstNameInput).toBeVisible();
      await expect(genderSelect).toBeVisible();
      await expect(birthDateInput).toBeVisible();
      await expect(validateButton).toBeVisible();
    });

    await test.step("Create User with errors in name and firstname 1", async () => {
      await profilePictureInput.setInputFiles("./e2e/assets/bernard.jpg");
      await lastNameInput.fill("12345");
      await firstNameInput.fill("12345");
      await genderSelect.selectOption("Homme");
      await birthDateInput.fill("1950-05-04");
      await validateButton.click();
      // We shouldn't be able to create such a user
      await expect(page).toHaveURL(`${testUrl}/admin/patient`);
    });

    await test.step("Create User with errors in name and firstname 2", async () => {
      // Added a dash at the beginning
      await lastNameInput.fill("-Dupont");
      await firstNameInput.fill("Bernard");
      await birthDateInput.fill("1950-05-05");
      await validateButton.click();
      // We shouldn't be able to create such a user
      await expect(page).toHaveURL(`${testUrl}/admin/patient`);
    });

    await test.step("Create User with errors in name and firstname 3", async () => {
      await lastNameInput.fill("Dupont");
      // Added a space at the end
      await firstNameInput.fill("Bernard ");
      await birthDateInput.fill("1950-05-05");
      await validateButton.click();
      // We shouldn't be able to create such a user
      await expect(page).toHaveURL(`${testUrl}/admin/patient`);
    });

    await test.step("Create User with error in birthdate", async () => {
      await lastNameInput.fill("Dupont");
      await firstNameInput.fill("Bernard");
      await birthDateInput.fill("1800-05-05");
      await validateButton.click();
      // We shouldn't be able to create such a user
      await expect(page).toHaveURL(`${testUrl}/admin/patient`);
      await genderSelect.selectOption("");
    });

    await test.step("Create User with no gender selected", async () => {
      await lastNameInput.fill("Dupont");
      await firstNameInput.fill("Jean-Marie");
      await birthDateInput.fill("1950-05-05");
      await validateButton.click();
      // We shouldn't be able to create such a user
      await expect(page).toHaveURL(`${testUrl}/admin/patient`);
    });

    await test.step("Create User without errors", async () => {
      await genderSelect.selectOption("Homme");
      await validateButton.click();
      await expect(page).toHaveURL(new RegExp(`${testUrl}\/admin\/patient\/\\d+`), {timeout: 50000});
      // We should be able to create such a user

      const createdUserProfilePicture = await patientInfoFormFixture.getCreatedUserProfilePicture();
      expect(createdUserProfilePicture).not.toEqual(null);
      const patientSettingsFixture = patientFixture.getPatientSettings();
      const dementiaInput = patientSettingsFixture.getDementiaLevel();
      const fontSizeInput = patientSettingsFixture.getFontSize();
      const removeWrongAnswersInput = patientSettingsFixture.getRemoveWrongAnswers();
      const fiftyFiftyInput = patientSettingsFixture.getFiftyFifty();
      const audioQuestionsInput = patientSettingsFixture.getAudioQuestions();
      await expect(dementiaInput).toBeVisible();
      await expect(fontSizeInput).toBeVisible();
      await expect(removeWrongAnswersInput).toBeVisible();
      await expect(fiftyFiftyInput).toBeVisible();
      await expect(audioQuestionsInput).toBeVisible();
    });
  });
});
