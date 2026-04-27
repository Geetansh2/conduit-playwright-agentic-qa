import { Browser, BrowserContext, chromium, firefox, webkit, LaunchOptions } from "@playwright/test";

export type BrowserType = "chromium" | "firefox" | "webkit";

export interface BrowserConfig {
  browserType: BrowserType;
  headless?: boolean;
  viewport?: { width: number; height: number };
  slowMo?: number;
}

class BrowserFactory {
  private browser!: Browser;

  async createBrowser(config: BrowserConfig): Promise<Browser> {
    const launchOptions: LaunchOptions = {
      headless: config.headless ?? true,
      slowMo: config.slowMo ?? 0,
    };

    switch (config.browserType) {
      case "firefox":
        this.browser = await firefox.launch(launchOptions);
        break;

      case "webkit":
        this.browser = await webkit.launch(launchOptions);
        break;

      case "chromium":
      default:
        this.browser = await chromium.launch(launchOptions);
        break;
    }

    return this.browser;
  }

  async createContext(config: BrowserConfig): Promise<BrowserContext> {
    if (!this.browser) {
      await this.createBrowser(config);
    }

    return await this.browser.newContext({
      viewport: config.viewport ?? { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
    });
  }

  async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

export const browserFactory = new BrowserFactory();