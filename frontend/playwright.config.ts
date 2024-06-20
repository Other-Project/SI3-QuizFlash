import {PlaywrightTestConfig} from "@playwright/test";

const config: PlaywrightTestConfig = {
  reporter: [['html', { open: 'always' }]],
  timeout: 50000, // define timeout limit
  use: {
    headless: !!process.env["HEADLESS"],
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "on",
    screenshot: "only-on-failure",
    launchOptions: {
      executablePath: process.env["CHROME_BIN"],
      slowMo: 100
    }
  },
};

export default config;
