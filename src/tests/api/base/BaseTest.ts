import { test as base, expect } from "@playwright/test";
import { APIClient } from "../../../core/api/APIClient";
import { allureReport } from "../../../core/reporting/AllureReport";

type Fixtures = {
  apiClient: APIClient;
    allure: typeof allureReport;
  
};

export const test = base.extend<Fixtures>({
   apiClient: async ({ request }, use) => {
    await use(new APIClient(request));
  },
 allure: async ({}, use) => {
    await use(allureReport);
 }
});

export { expect };