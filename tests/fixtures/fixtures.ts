import { test as base } from "@playwright/test";

export const test = base.extend<{ forEachTest: void }>({
  forEachTest: [
    async ({ page }, use) => {
      // This code runs before every test.
      console.log(`Secret key: ${process.env.SHA256}`);

      await use();

      // This code runs after every test.
      await page.close();
    },
    { auto: true },
  ], // automatically starts for every test.
});

export {expect} from '@playwright/test';