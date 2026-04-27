# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/auth/login.ui.spec.ts >> User login UI with wrong Creds
- Location: src/tests/ui/auth/login.ui.spec.ts:20:5

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
  4  | 
  5  | test("User login UI with correct Creds", async ({ page, allure }) => {
  6  |     await allure.epic("LOGIN")
  7  |     await allure.addFeature("Authentication");
  8  |     await allure.addStory("User Login");
  9  |     await allure.setSeverity("CRITICAL");
  10 | 
  11 |   const authPage = new AuthPage(page);
  12 |   const authFlow = new AuthFlow(authPage);
  13 | 
  14 |   await allure.step("Perform login", async () => {
  15 |     await authFlow.login("geetanshbhatia12@gmail.com", "12345");
  16 |   });
  17 |   await expect(page).toHaveURL("http://localhost:4101/");
  18 | });
  19 | 
  20 | test("User login UI with wrong Creds", async ({ page, allure }) => {
  21 |     await allure.epic("LOGIN")
  22 |     await allure.addFeature("Authentication");
  23 |     await allure.addStory("User Login");
  24 |     await allure.setSeverity("CRITICAL");
  25 | 
  26 |   const authPage = new AuthPage(page);
  27 |   const authFlow = new AuthFlow(authPage);
  28 | 
  29 |   await allure.step("Perform login", async () => {
  30 |     await authFlow.login("test@test.com", "Password123");
  31 |   });
  32 | 
  33 |   await allure.step("Validate error message", async () => {
  34 |     const errorText = await authPage.getErrorMessage();
> 35 |     await expect(errorText).toContain("email password is invalid");
     |                             ^ Error: expect(received).toContain(expected) // indexOf
  36 |   });
  37 | 
  38 | });
  39 | 
  40 | 
```