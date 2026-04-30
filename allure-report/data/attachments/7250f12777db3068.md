# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/auth/signIn.ui.spec.ts >> User login UI with wrong Creds @regression @ui
- Location: src/tests/ui/auth/signIn.ui.spec.ts:22:5

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "email password is invalid"
Received string:    "email or password is invalid"
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e5]:
      - link "conduit" [ref=e6]:
        - /url: /
      - list [ref=e7]:
        - listitem [ref=e8]:
          - link "Home" [ref=e9]:
            - /url: /
        - listitem [ref=e10]:
          - link "Sign in" [ref=e11]:
            - /url: /login
        - listitem [ref=e12]:
          - link "Sign up" [ref=e13]:
            - /url: /register
  - generic [ref=e17]:
    - heading "Sign In" [level=1] [ref=e18]
    - paragraph [ref=e19]:
      - link "Need an account?" [ref=e20]:
        - /url: /register
    - list [ref=e21]:
      - listitem [ref=e22]: email or password is invalid
    - group [ref=e24]:
      - group [ref=e25]:
        - textbox "Email" [ref=e26]: test@test.com
      - group [ref=e27]:
        - textbox "Password" [ref=e28]: Password123
      - button "Sign in" [ref=e29]
```

# Test source

```ts
  1  | import { test, expect } from "../base/BaseTest";
  2  | import { AuthPage } from '../../../domain/auth/auth.page'
  3  | import { AuthFlow } from "../../../domain/auth/auth.flow";
  4  | import { ConfigManager } from "../../../core/config/ConfigManager";
  5  | import { loginScenarios } from '../../../data/test-data/auth/signin.scenarios'
  6  | import { allureMeta } from "../../../core/utils/AllureUtils";
  7  | 
  8  | 
  9  | 
  10 | test("User login UI with correct Creds @regression @ui", async ({ page, allure }) => {
  11 |   await allureMeta(allure,"UI", "LOGIN", "Authentication", "User Login - Valid Creds", "CRITICAL");
  12 | 
  13 |   const authPage = new AuthPage(page);
  14 |   const authFlow = new AuthFlow(authPage);
  15 | 
  16 |   await allure.step("Perform login", async () => {
  17 |     await authFlow.login(loginScenarios.validUser.email, loginScenarios.validUser.password);
  18 |   });
  19 |   await expect(page).toHaveURL(ConfigManager.get("baseUrl"));
  20 | });
  21 | 
  22 | test("User login UI with wrong Creds @regression @ui", async ({ page, allure }) => {
  23 |   await allureMeta(allure, "UI", "LOGIN", "Authentication", "User Login - Invalid Creds", "CRITICAL");
  24 | 
  25 |   const authPage = new AuthPage(page);
  26 |   const authFlow = new AuthFlow(authPage);
  27 | 
  28 |   await allure.step("Perform login", async () => {
  29 |     await authFlow.login(loginScenarios.invalidUser.email, loginScenarios.invalidUser.password);
  30 |   });
  31 | 
  32 |   await allure.step("Validate error message", async () => {
  33 |     const errorText = await authPage.getErrorMessage();
> 34 |     await expect(errorText).toContain(loginScenarios.invalidUser.expectedError);
     |                             ^ Error: expect(received).toContain(expected) // indexOf
  35 |   });
  36 | 
  37 | });
  38 | 
  39 | 
```