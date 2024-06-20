import {expect, test} from "@playwright/test";
import {testUrl} from "e2e/e2e.config";
import {ProfilesFixture} from "../../src/app/profiles/profiles.fixture";
import {AdminPatientsFixture} from "../../src/app/admin/pages/patients/admin-patients.fixture";
import {PatientFixture} from "../../src/app/admin/pages/patient/patient.fixture";

test.describe("Create user with errors test display", () => {
  test("Create user with errors test", async ({page}) => {
    await page.goto(testUrl);

    await test.step("Create User errors Navigation", async () => {
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
    const profilePictureInput = patientHeaderFixture.getProfilePictureInput();
    const lastNameInput = patientHeaderFixture.getLastNameInput();
    const firstNameInput = patientHeaderFixture.getFirstNameInput();
    const birthDateInput = patientHeaderFixture.getBirthDateInput();
    const validateButton = patientHeaderFixture.getValidateButton();

    await test.step("User form presence verification", async () => {
      await expect(createUserTitle).toBeVisible();
      await expect(lastNameInput).toBeVisible();
      await expect(firstNameInput).toBeVisible();
      await expect(birthDateInput).toBeVisible();
      await expect(validateButton).toBeVisible();
    });

    await test.step("Create User with errors in name and firstname 1", async () => {
      await profilePictureInput.setInputFiles("./src/assets/users/bernard.jpg");
      await lastNameInput.fill("12345");
      await firstNameInput.fill("12345");
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
    });

    await test.step("Create user with a wrong profile picture", async () => {
      await birthDateInput.fill("1950-05-05");
      const profilePictureImage = await patientHeaderFixture.getProfilePictureImage();
      await profilePictureInput.setInputFiles("./src/assets/Dogs and Cats.mp3");
      const profilePictureImage2 = await patientHeaderFixture.getProfilePictureImage();
      // The preview shouldn't change as we pass it a wrong file
      expect(profilePictureImage).toEqual(profilePictureImage2);
      await profilePictureInput.setInputFiles([]);
      await profilePictureInput.setInputFiles("./src/assets/users/bernard.jpg");
    });

    await test.step("Create User without errors", async () => {
      await lastNameInput.fill("Dupont");
      await firstNameInput.fill("Jean-Marie");
      await birthDateInput.fill("1950-05-05");
      await validateButton.click();
      // We should be able to create such a user
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
