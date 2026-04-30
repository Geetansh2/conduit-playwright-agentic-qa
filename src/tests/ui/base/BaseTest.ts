import { test as base, expect } from "@playwright/test";
import { browserFactory } from "../../../core/factory/BrowserFactory";
import { ConfigManager } from "../../../core/config/ConfigManager";
import { allureReport } from "../../../core/reporting/AllureReport";


type Fixtures = {
   allure: typeof allureReport;

};

export const test = base.extend<Fixtures>({
    allure: async ({}, use, testInfo) => {
    await allureReport.parentSuite(`Browser: ${testInfo.project.name}`);
    await use(allureReport);
  
  },
});

export { expect };