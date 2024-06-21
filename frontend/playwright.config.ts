import {PlaywrightTestConfig} from "@playwright/test";

const config: PlaywrightTestConfig = {
  outputDir: "./reports/test-results",
  reporter: process.env["CI"]
    ? [["json", {outputFile: "./reports/test-results.json"}], ["github"]]
    : [["html", {open: "always", outputFolder: "./reports/html"}]],
  timeout: 50000, // define timeout limit
  use: {
    headless: !!process.env["HEADLESS"],
    viewport: {width: 1280, height: 720},
    ignoreHTTPSErrors: true,
    video: "on",
    screenshot: "on",
    launchOptions: {
      executablePath: process.env["CHROME_BIN"],
      slowMo: 100
    }
  }
};

export default config;
