import {Locator, Page} from "@playwright/test";

export class E2EComponentFixture {
  protected page: Locator | Page;

  constructor(page: Locator | Page) {
    this.page = page;
  }
}
