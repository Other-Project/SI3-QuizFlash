import {E2EComponentFixture} from "e2e/e2e-component.fixture";
import {PatientInfoFormFixture} from "./info-form/info-form.fixture";
import {OptionsFixture} from "./options/options.fixture";

export class PatientFixture extends E2EComponentFixture {
  getPatientInfoFormFixture() {
    return new PatientInfoFormFixture(this.page.locator("patient-header"));
  }

  getPatientSettings() {
    return new OptionsFixture(this.page);
  }
}
