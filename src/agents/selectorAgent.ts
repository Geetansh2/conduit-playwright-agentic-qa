// src/core/agents/selectorAgent.ts

import { Page } from "@playwright/test";

export class SelectorAgent {

  static async find(page: Page, selector: string) {

    try {
      return page.locator(selector);
    } catch {
      // fallback strategy
      return page.locator(`text=${selector}`);
    }
  }
}