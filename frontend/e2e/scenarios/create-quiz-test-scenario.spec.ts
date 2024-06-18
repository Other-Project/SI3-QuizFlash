import {expect, test} from "@playwright/test";
import {testUrl} from "e2e/e2e.config";
import {ProfilesFixture} from "../../src/app/profiles/profiles.fixture";
import {AdminFixture} from "../../src/app/admin/admin.fixture";

// This file is here to test the playwright integration.
test.describe("Create Quiz test display", () => {
  test("Create quiz test", async ({page}) => {
    await page.goto(testUrl);

    const adminFixture = new AdminFixture(page);
    const adminQuizzesFixture = adminFixture.getAdminQuizzesFixture();

    await test.step("Create Quiz Navigation", async () => {
      const profilesFixture = new ProfilesFixture(page);

      const adminButton = profilesFixture.getAdminButtonFixture().getAdminButton();

      await expect(adminButton).toBeVisible();
      await adminButton.click();
      await expect(page).toHaveURL(`${testUrl}/admin/patients`);

      const quizzesButton = adminFixture.getAdminNavbarFixture().getQuizzes();
      await expect(quizzesButton).toBeVisible();
      await quizzesButton.click();
      await expect(page).toHaveURL(`${testUrl}/admin/quizzes`);

      const createQuizButton = adminQuizzesFixture.getCreateQuizButton();
      await expect(createQuizButton).toBeVisible();
      await createQuizButton.click();
      await expect(page).toHaveURL(`${testUrl}/admin/quizzes/quiz`);
    });
    const adminQuizFixture = adminQuizzesFixture.getAdminQuizFixture();

    await test.step("Create Quiz Instance", async () => {

      const titlePlaceHolder = adminQuizFixture.getQuizTitlePlaceHolder();
      await titlePlaceHolder.fill("La pêche");

      const tagMenu = adminQuizFixture.getTagMenu();
      await expect(tagMenu).toBeVisible();
      await tagMenu.click();
      const fishingTag = adminQuizFixture.getFishingTag();
      await expect(fishingTag).toBeVisible();
      await fishingTag.click();

      const quizPicture = adminQuizFixture.getQuizPicture();
      await quizPicture.setInputFiles("./frontend/src/assets/quiz-test/fishing.jpg");

      //TODO : replace when we find a better way
      await titlePlaceHolder.click();

      const createQuizButton = adminQuizFixture.getCreateQuizButton();
      await expect(createQuizButton).toBeVisible();
      await createQuizButton.click();
    });
    const createQuestionButton = adminQuizFixture.getCreateQuestionButton();

    await test.step("Create the first (pictorial) question", async () => {

      await expect(createQuestionButton).toBeVisible();
      await createQuestionButton.click();

      const questionFixture = adminQuizFixture.getQuestionFixture(1);
      const questionTitle = questionFixture.getQuestionTitlePlaceHolder();
      const questionTypeMenu = questionFixture.getQuestionTypeMenu();
      const questionFirstProposition = questionFixture.getProposition(1);
      const questionSecondProposition = questionFixture.getProposition(2);
      const questionAddProposition = questionFixture.getAddProposition();
      const questionRightProposition = questionFixture.getRightProposition(2);

      await expect(questionTitle).toBeVisible();
      await questionTypeMenu.selectOption("Visuelle");
      const questionPicture = questionFixture.getQuestionPicture();
      await questionPicture.setInputFiles("./frontend/src/assets/quiz-test/caviar.png");

      await questionTitle.fill("De quel poisson le caviar vient-il ?");
      await questionFirstProposition.fill("Le requin");
      await questionSecondProposition.fill("L'esturgeon");
      await questionAddProposition.click();
      const questionThirdProposition = questionFixture.getProposition(3);
      await questionThirdProposition.fill("Le poisson-lune");
      await questionRightProposition.click();

      const questionSaveButton = questionFixture.getSaveQuestionButton();
      await questionSaveButton.click();
    });

    await test.step("Create the second (text) question", async () => {
      await createQuestionButton.click();

      const questionFixture = adminQuizFixture.getQuestionFixture(2);
      const questionTitle = questionFixture.getQuestionTitlePlaceHolder();
      const questionTypeMenu = questionFixture.getQuestionTypeMenu();
      const questionFirstProposition = questionFixture.getProposition(1);
      const questionSecondProposition = questionFixture.getProposition(2);
      const questionAddProposition = questionFixture.getAddProposition();
      const questionRightProposition = questionFixture.getRightProposition(1);

      await questionTypeMenu.selectOption("Textuelle");

      await questionTitle.fill("Quel type de poisson est le plus souvent pêché pour le sport en mer ?");
      await questionFirstProposition.fill("Le bar");
      await questionSecondProposition.fill("La carpe");
      await questionAddProposition.click();
      const questionThirdProposition = questionFixture.getProposition(3);
      await questionThirdProposition.fill("L'anguille");
      await questionAddProposition.click();
      const fourthProposition = questionFixture.getProposition(4);
      await fourthProposition.fill("Le brochet");
      await questionRightProposition.click();

      const questionSaveButton = questionFixture.getSaveQuestionButton();
      await questionSaveButton.click();
    });

    await test.step("Create the third (audio) question", async () => {
      await createQuestionButton.click();

      const questionFixture = adminQuizFixture.getQuestionFixture(3);
      const questionTitle = questionFixture.getQuestionTitlePlaceHolder();
      const questionTypeMenu = questionFixture.getQuestionTypeMenu();
      const questionFirstProposition = questionFixture.getProposition(1);
      const questionSecondProposition = questionFixture.getProposition(2);
      const questionAddProposition = questionFixture.getAddProposition();

      await questionTypeMenu.selectOption("Sonore");
      const questionAudioInput = questionFixture.getQuestionAudio();
      await questionAudioInput.setInputFiles("./frontend/src/assets/quiz-test/la peche aux moules.mp3");

      await questionTitle.fill("Quel est cette chanson connue sur la pêche ?");
      await questionFirstProposition.fill("Cueillir des fleur");
      await questionSecondProposition.fill("Il était un petit navire");
      await questionAddProposition.click();
      const questionThirdProposition = questionFixture.getProposition(3);
      await questionThirdProposition.fill("A la pêche aux moules");
      await questionAddProposition.click();
      const fourthProposition = questionFixture.getProposition(4);
      await fourthProposition.fill("Faire de la voile");
      const questionRightProposition = questionFixture.getRightProposition(3);
      await questionRightProposition.click();

      const questionSaveButton = questionFixture.getSaveQuestionButton();
      await questionSaveButton.click();
    });
  });
});
