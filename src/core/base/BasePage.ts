import { Page } from "@playwright/test";
import { allureReport } from "../reporting/AllureReport";
import { logger } from "../logger/Logger";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async step<T>(name: string, action: () => Promise<T>): Promise<T> {
    logger.info(name);
    return await allureReport.step(name, action);
  }

  protected async click(selector: string) {
    await this.page.click(selector);
  }

  protected async fill(selector: string, value: string) {
    await this.page.fill(selector, value);
  }

  protected locator(selector: string) {
    return this.page.locator(selector);
  }
}