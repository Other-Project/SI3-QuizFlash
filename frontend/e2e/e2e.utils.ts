import {Page} from "@playwright/test";

export async function getButtonByText(page: Page, text: string, tag: string) {
  return page.locator(tag).getByRole("button").filter({hasText: text});
}
