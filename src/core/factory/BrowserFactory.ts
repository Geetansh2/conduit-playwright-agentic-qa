import {
  Browser,
  BrowserContext,
  chromium,
  firefox,
  webkit,
  LaunchOptions,
} from "@playwright/test";

export type SupportedBrowser = "chromium" | "firefox" | "webkit";

export interface BrowserConfig {
  browserType: SupportedBrowser;
  headless?: boolean;
  viewport?: { width: number; height: number };
  slowMo?: number;
}

class BrowserFactory {

  async launchBrowser(config: BrowserConfig): Promise<Browser> {
    const options: LaunchOptions = {
      headless: config.headless ?? true,
      slowMo: config.slowMo ?? 0,
    };

    switch (config.browserType) {
      case "firefox":
        return await firefox.launch(options);

      case "webkit":
        return await webkit.launch(options);

      default:
        return await chromium.launch(options);
    }
  }

  async createContext(
    browser: Browser,
    config: BrowserConfig
  ): Promise<BrowserContext> {
    return await browser.newContext({
      viewport: config.viewport ?? { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
    });
  }

  async createPage(config: BrowserConfig) {
    const browser = await this.launchBrowser(config);
    const context = await this.createContext(browser, config);
    const page = await context.newPage();

    return { browser, context, page };
  }
}

export const browserFactory = new BrowserFactory();