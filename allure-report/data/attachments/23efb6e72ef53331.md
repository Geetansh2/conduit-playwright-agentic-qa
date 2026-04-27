# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/auth/login.ui.spec.ts >> User login UI with wrong Creds
- Location: src/tests/ui/auth/login.ui.spec.ts:21:5

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
      - link "conduit" [ref=e6] [cursor=pointer]:
        - /url: /
      - list [ref=e7]:
        - listitem [ref=e8]:
          - link "Home" [ref=e9] [cursor=pointer]:
            - /url: /
        - listitem [ref=e10]:
          - link "Sign in" [ref=e11] [cursor=pointer]:
            - /url: /login
        - listitem [ref=e12]:
          - link "Sign up" [ref=e13] [cursor=pointer]:
            - /url: /register
  - generic [ref=e17]:
    - heading "Sign In" [level=1] [ref=e18]
    - paragraph [ref=e19]:
      - link "Need an account?" [ref=e20] [cursor=pointer]:
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
  1  | import { test, expect } from "../base/BaseTest.spec";
  2  | import { AuthPage } from '../../../domain/auth/auth.page'
  3  | import { AuthFlow } from "../../../domain/auth/auth.flow";
  4  | import { ConfigManager } from "../../../core/config/ConfigManager";
  5  | 
  6  | test("User login UI with correct Creds", async ({ page, allure }) => {
  7  |     await allure.epic("LOGIN")
  8  |     await allure.addFeature("Authentication");
  9  |     await allure.addStory("User Login");
  10 |     await allure.setSeverity("CRITICAL");
  11 | 
  12 |   const authPage = new AuthPage(page);
  13 |   const authFlow = new AuthFlow(authPage);
  14 | 
  15 |   await allure.step("Perform login", async () => {
  16 |     await authFlow.login("geetanshbhatia12@gmail.com", "12345");
  17 |   });
  18 |   await expect(page).toHaveURL(ConfigManager.get("baseUrl"));
  19 | });
  20 | 
  21 | test("User login UI with wrong Creds", async ({ page, allure }) => {
  22 |     await allure.epic("LOGIN")
  23 |     await allure.addFeature("Authentication");
  24 |     await allure.addStory("User Login");
  25 |     await allure.setSeverity("CRITICAL");
  26 | 
  27 |   const authPage = new AuthPage(page);
  28 |   const authFlow = new AuthFlow(authPage);
  29 | 
  30 |   await allure.step("Perform login", async () => {
  31 |     await authFlow.login("test@test.com", "Password123");
  32 |   });
  33 | 
  34 |   await allure.step("Validate error message", async () => {
  35 |     const errorText = await authPage.getErrorMessage();
> 36 |     await expect(errorText).toContain("email password is invalid");
     |                             ^ Error: expect(received).toContain(expected) // indexOf
  37 |   });
  38 | 
  39 | });
  40 | 
  41 | 
```