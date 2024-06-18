import {Page} from "@playwright/test";
import {testUrl} from "./e2e.config";
import {Quiz} from "../src/models/quiz.models";
import {APIRequestContext} from "playwright";

export async function getButtonByText(page: Page, text: string, tag: string) {
  return page.locator(tag).getByRole("button").filter({hasText: text});
}

export async function getQuiz(quizId: string, request: APIRequestContext) {
  // Perform login and capture cookies
  const loginResponse = await request.post(`${testUrl}/api/auth/login/password`, {
    data: {
      username: 1715587135341,
      password: "admin"
    }
  });

  if (!loginResponse.ok())
    throw new Error("Failed to log in");

  // Capture cookies from login response
  const cookies = loginResponse.headers()["set-cookie"];

  if (!cookies)
    throw new Error("No cookies set after login");

  // Fetch the quiz data using the request context with headers
  const headers = {
    "Cookie": cookies
  };

  const quizResponse = await request.get(`${testUrl}/api/quizzes/${quizId}`, {headers});
  if (!quizResponse.ok()) {
    throw new Error("Failed to fetch quiz data");
  }
  return await quizResponse.json() as Quiz;
}
