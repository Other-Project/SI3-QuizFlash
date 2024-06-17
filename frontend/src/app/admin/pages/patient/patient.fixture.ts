import {E2EComponentFixture} from "e2e/e2e-component.fixture";
import {PatientHeaderFixture} from "./header/patient-header.fixture";
import {OptionsFixture} from "./options/options.fixture";

export class PatientFixture extends E2EComponentFixture {
  getPatientHeaderFixture() {
    return new PatientHeaderFixture(this.page);
  }

  getPatientSettings() {
    return new OptionsFixture(this.page);
  }
}
