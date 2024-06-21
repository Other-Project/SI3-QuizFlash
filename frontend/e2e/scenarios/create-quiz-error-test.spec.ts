import {expect, test} from "@playwright/test";
import {testUrl} from "../e2e.config";
import {ProfilesFixture} from "../../src/app/profiles/profiles.fixture";
import {AdminFixture} from "../../src/app/admin/admin.fixture";

// This file is here to test the playwright integration.
test.describe("Create Quiz with errors test display", () => {
  test.setTimeout(100000);
  test("Create quiz with errors test", async ({page}) => {
    await page.goto(testUrl);

    const adminFixture = new AdminFixture(page);
    const adminQuizzesFixture = adminFixture.getAdminQuizzesFixture();

    await test.step("Create Quiz Navigation", async () => {
      const profilesFixture = new ProfilesFixture(page);
      const firstProfile = profilesFixture.getFirstProfile();

      await expect(firstProfile).toBeVisible({timeout: 50000});
      const adminButton = profilesFixture.getAdminButtonFixture().getAdminButton();

      await expect(adminButton).toBeVisible();
      await adminButton.click();
      await expect(page).toHaveURL(`${testUrl}/admin/patients`);

      const quizzesButton = adminFixture.getAdminNavbarFixture().getQuizzes();
      await expect(quizzesButton).toBeVisible();
      await quizzesButton.click();
      await expect(page).toHaveURL(`${testUrl}/admin/quizzes`);
    });
    const numberOfQuizzesBeginning = await adminQuizzesFixture.getNumberOfQuizzes();
    const adminQuizFixture = adminQuizzesFixture.getAdminQuizFixture();

    const createQuizButton = adminQuizzesFixture.getCreateQuizButton();

    await test.step("Try to create a quiz without saving it", async () => {
      await expect(createQuizButton).toBeVisible();
      await createQuizButton.click();
      await expect(page).toHaveURL(`${testUrl}/admin/quizzes/quiz`);

      const titlePlaceHolder = adminQuizFixture.getQuizTitlePlaceHolder();
      await titlePlaceHolder.fill("La pêche (error test)");

      const quizPicture = adminQuizFixture.getQuizPicture();
      await quizPicture.setInputFiles("./e2e/assets/fishing.jpg");

      const quizzesButton = adminFixture.getAdminNavbarFixture().getQuizzes();
      await expect(quizzesButton).toBeVisible();
      await quizzesButton.click();
      await expect(page).toHaveURL(`${testUrl}/admin/quizzes`);

      // Wait for the quizzes to load
      await expect(adminQuizzesFixture.getFirstQuizElement()).toBeVisible();

      const numberOfQuizzesEnd = await adminQuizzesFixture.getNumberOfQuizzes();
      expect(numberOfQuizzesBeginning).toEqual(numberOfQuizzesEnd);
    });

    await test.step("Create the quiz instance", async () => {
      await expect(createQuizButton).toBeVisible();
      await createQuizButton.click();
      await expect(page).toHaveURL(`${testUrl}/admin/quizzes/quiz`);

      const titlePlaceHolder = adminQuizFixture.getQuizTitlePlaceHolder();
      await titlePlaceHolder.fill("La pêche (error test)");

      const tagMenu = adminQuizFixture.getTagMenu();
      await expect(tagMenu).toBeVisible();
      await tagMenu.click();
      const fishingTag = adminQuizFixture.getFishingTag();
      await expect(fishingTag).toBeVisible();
      await fishingTag.click();

      const quizPicture = adminQuizFixture.getQuizPicture();
      await quizPicture.setInputFiles("./e2e/assets/fishing.jpg");
      await titlePlaceHolder.click();

      const createQuizQuestionsButton = adminQuizFixture.getCreateQuizButton();
      await expect(createQuizQuestionsButton).toBeVisible();
      await createQuizQuestionsButton.click();
    });

    const createQuestionButton = adminQuizFixture.getCreateQuestionButton();

    await test.step("Create an empty question and check if it is saved", async () => {

      await expect(createQuestionButton).toBeVisible({timeout: 50000});
      await createQuestionButton.click();

      const numberOfQuestionsBeginning = await adminQuizFixture.getNumberOfQuestions();

      const quizzesButton = adminFixture.getAdminNavbarFixture().getQuizzes();
      await expect(quizzesButton).toBeVisible();
      await quizzesButton.click();
      await expect(page).toHaveURL(`${testUrl}/admin/quizzes`);

      const currentQuiz = adminQuizzesFixture.getAQuiz("La pêche (error test)");
      await expect(currentQuiz).toBeVisible();
      await currentQuiz.click();

      const numberOfQuestionsEnd = await adminQuizFixture.getNumberOfQuestions();
      expect(numberOfQuestionsBeginning).toEqual(numberOfQuestionsEnd + 1);
    });

    await test.step("Create a first (text) question instance with errors checks", async () => {
      await createQuestionButton.click();

      const questionFixture = adminQuizFixture.getQuestionFixture(1);
      const questionTitle = questionFixture.getQuestionTitlePlaceHolder();
      const questionTypeMenu = questionFixture.getQuestionTypeMenu();

      await questionTypeMenu.selectOption("Textuelle");

      await questionTitle.fill("Quel type de poisson est le plus souvent pêché pour le sport en mer ?");
      expect(await questionFixture.isSaveButtonDisabled()).toEqual(true);

      const questionFirstProposition = questionFixture.getProposition(1);
      await questionFirstProposition.fill("L'anguille");
      expect(await questionFixture.isSaveButtonDisabled()).toEqual(true);

      const questionSecondProposition = questionFixture.getProposition(2);
      await questionSecondProposition.fill("Le bar");
      expect(await questionFixture.isSaveButtonDisabled()).toEqual(false);

      const addProposition = questionFixture.getAddProposition();
      await addProposition.click();

      const questionThirdProposition = questionFixture.getProposition(3);
      expect(await questionFixture.isSaveButtonDisabled()).toEqual(true);
      await questionThirdProposition.fill("Le poisson chat");
      expect(await questionFixture.isSaveButtonDisabled()).toEqual(false);

      const questionSaveButton = questionFixture.getSaveQuestionButton();
      await expect(questionSaveButton).toBeVisible();
      await questionSaveButton.click();
      await expect(questionFixture.getSaveButtonIcon()).toBeVisible();
    });

    await test.step("Check if the first question is saved", async () => {
      const numberOfQuestionBeginning = await adminQuizFixture.getNumberOfQuestions();

      const quizzesButton = adminFixture.getAdminNavbarFixture().getQuizzes();
      await expect(quizzesButton).toBeVisible();
      await quizzesButton.click();
      await expect(page).toHaveURL(`${testUrl}/admin/quizzes`);

      const currentQuiz = adminQuizzesFixture.getAQuiz("La pêche (error test)");
      await expect(currentQuiz).toBeVisible();
      await currentQuiz.click();

      await expect(page.locator("app-admin-question").nth(0)).toBeVisible({timeout: 50000});
      const numberOfQuestionEnd = await adminQuizFixture.getNumberOfQuestions();
      expect(numberOfQuestionBeginning).toEqual(numberOfQuestionEnd);
    });

    await test.step("Add a second question (pictorial) with errors", async () => {
      await expect(createQuestionButton).toBeVisible();
      await createQuestionButton.click();

      const questionFixture = adminQuizFixture.getQuestionFixture(2);
      const questionTitle = questionFixture.getQuestionTitlePlaceHolder();
      const questionTypeMenu = questionFixture.getQuestionTypeMenu();
      const questionFirstProposition = questionFixture.getProposition(1);
      const questionSecondProposition = questionFixture.getProposition(2);


      await questionTypeMenu.selectOption("Visuelle");
      const questionPicture = questionFixture.getQuestionPicture();
      expect(await questionFixture.isSaveButtonDisabled()).toEqual(true);

      await questionPicture.setInputFiles("./e2e/assets/fishing.jpg");
      await questionTitle.fill("Que fait-il ?");
      await questionFirstProposition.fill("Il pêche");
      expect(await questionFixture.isSaveButtonDisabled()).toEqual(true);
      await questionSecondProposition.fill("Il a la pêche");
      expect(await questionFixture.isSaveButtonDisabled()).toEqual(false);

      const questionSaveButton = questionFixture.getSaveQuestionButton();
      await expect(questionSaveButton).toBeVisible();
      await questionSaveButton.click();
      // To wait the image saving in the back-end
      await expect(questionFixture.getSaveButtonIcon()).toBeVisible({timeout: 10000});
    });

    await test.step("Create a third question (sound) with empty audio and check if it is saved", async () => {
      await createQuestionButton.click();

      const questionFixture = adminQuizFixture.getQuestionFixture(3);
      const questionTitle = questionFixture.getQuestionTitlePlaceHolder();
      const questionTypeMenu = questionFixture.getQuestionTypeMenu();
      const questionFirstProposition = questionFixture.getProposition(1);
      const questionSecondProposition = questionFixture.getProposition(2);

      await questionTypeMenu.selectOption("Sonore");
      await questionTitle.fill("Quel est ce bruit ?");
      await questionFirstProposition.fill("un bateau");
      await questionSecondProposition.fill("Un lac");
      const numberOfQuestionsBeginning = await adminQuizFixture.getNumberOfQuestions();

      const quizzesButton = adminFixture.getAdminNavbarFixture().getQuizzes();
      await expect(quizzesButton).toBeVisible();
      await quizzesButton.click();
      await expect(page).toHaveURL(`${testUrl}/admin/quizzes`);

      const currentQuiz = adminQuizzesFixture.getAQuiz("La pêche (error test)");
      await expect(currentQuiz).toBeVisible();
      await currentQuiz.click();
      await expect(page.locator("app-admin-question").nth(1)).toBeVisible({timeout: 50000});
      const numberOfQuestionsEnd = await adminQuizFixture.getNumberOfQuestions();
      expect(numberOfQuestionsBeginning).toEqual(numberOfQuestionsEnd + 1);
    });
  });
});
