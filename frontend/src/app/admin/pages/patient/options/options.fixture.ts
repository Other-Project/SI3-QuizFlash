import {E2EComponentFixture} from "e2e/e2e-component.fixture";


export class OptionsFixture extends E2EComponentFixture {
  getDementiaLevel() {
    return this.page.getByLabel("Stade de la maladie d'Alzheimer", {exact: true});
  }

  getFontSize() {
    return this.page.getByLabel("Taille de la police", {exact: true});
  }

  getRemoveWrongAnswers() {
    return this.page.getByLabel("Retirer les mauvaises réponses", {exact: true});
  }

  getFiftyFifty() {
    return this.page.getByLabel("Aide à la réponse (50/50)", {exact: true});
  }

  getAudioQuestions() {
    return this.page.getByLabel("Question auditive", {exact: true});
  }
}
