import { test as base, expect } from "@playwright/test";
import { browserFactory } from "../../../core/factory/BrowserFactory";
import { ConfigManager } from "../../../core/config/ConfigManager";
import { allureReport } from "../../../core/reporting/AllureReport";


type Fixtures = {
  page: any;
   allure: typeof allureReport;

};

export const test = base.extend<Fixtures>({
  page: async ({}, use) => {

    const { browser, context, page } = await browserFactory.createPage({
      browserType: ConfigManager.get('browser'),
      headless: Boolean(ConfigManager.get('headless')),
    });

    await use(page);

    await context.close();
    await browser.close();
  },
    allure: async ({}, use) => {
    await use(allureReport);
  
  },
});

export { expect };