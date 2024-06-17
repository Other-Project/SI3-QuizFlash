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

    await test.step("Create User", async () => {
      await expect(createUserTitle).toBeVisible();
      await expect(lastNameInput).toBeVisible();
    });
  });
});
