# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/auth/signIn.ui.spec.ts >> User login UI with wrong Creds
- Location: src/tests/ui/auth/signIn.ui.spec.ts:22:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4101/login
Call log:
  - navigating to "http://localhost:4101/login", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "This site can’t be reached" [level=1] [ref=e7]
    - paragraph [ref=e8]:
      - strong [ref=e9]: localhost
      - text: refused to connect.
    - generic [ref=e10]:
      - paragraph [ref=e11]: "Try:"
      - list [ref=e12]:
        - listitem [ref=e13]: Checking the connection
        - listitem [ref=e14]:
          - link "Checking the proxy and the firewall" [ref=e15] [cursor=pointer]:
            - /url: "#buttons"
    - generic [ref=e16]: ERR_CONNECTION_REFUSED
  - generic [ref=e17]:
    - button "Reload" [ref=e19] [cursor=pointer]
    - button "Details" [ref=e20] [cursor=pointer]
```

# Test source

```ts
  1  | import { BasePage } from "../../core/base/BasePage";
  2  | import { ConfigManager } from "../../core/config/ConfigManager";
  3  | import { logger } from "../../core/logger/Logger";
  4  | 
  5  | export class AuthPage extends BasePage {
  6  | 
  7  |   // 🔹 Selectors (centralized)
  8  |   private selectors = {
  9  |     emailInput: "input[placeholder='Email']",
  10 |     passwordInput: "input[placeholder='Password']",
  11 |     signInButton: "//button[normalize-space()='Sign in']",
  12 |     errorMessage: "ul[class='error-messages'] li",
  13 |   };
  14 | 
  15 |   async navigateToLogin() {
  16 |     await this.step("Navigate to Login Page", async () => {
  17 |       logger.info("BaseUrl: " + ConfigManager.get('baseUrl'));
> 18 |       await this.page.goto(ConfigManager.get('baseUrl') + '/login');
     |                       ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4101/login
  19 |     });
  20 |   }
  21 | 
  22 |   async enterEmail(email: string) {
  23 |     await this.step("Enter Email", async () => {
  24 |       await this.fill(this.selectors.emailInput, email);
  25 |     });
  26 |   }
  27 | 
  28 |   async enterPassword(password: string) {
  29 |     await this.step("Enter Password", async () => {
  30 |       await this.fill(this.selectors.passwordInput, password);
  31 |     });
  32 |   }
  33 | 
  34 |   async clickLogin() {
  35 |     await this.step("Click SignIn Button Button", async () => {
  36 |       await this.click(this.selectors.signInButton);
  37 |     });
  38 |   }
  39 | 
  40 |   async getErrorMessage() {
  41 |     return await this.step("Get Error Message", async () => {
  42 |       return await this.locator(this.selectors.errorMessage).textContent();
  43 |     });
  44 |   }
  45 | }
```