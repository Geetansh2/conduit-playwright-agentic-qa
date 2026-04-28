<img width="1910" height="1012" alt="Screenshot 2026-04-28 at 5 42 11 PM" src="https://github.com/user-attachments/assets/9816be65-d7bb-4364-b16f-b5ba32ca9942" /># 🚀 Conduit Playwright Agentic QA

An agentic-first test automation framework** built using **Playwright + TypeScript** for the Conduit (Medium-style) application.

This framework combines:

* API + UI
* Agent-based orchestration
* Resilient execution (retry + rate limiting)
* Scalable, domain-driven architecture
* AI-friendly design for future automation

---

# 🧠 Core Philosophy

> Tests should express **intent**, not implementation.

This framework introduces an **Agent Layer** that abstracts:

* Authentication
* Data generation
* API/UI orchestration

---

# 🏗️ Architecture (HLD)

```text
Tests
  ↓
Agents (Smart Orchestration)
  ↓
Domain (API / UI / Flows)
  ↓
Core (APIClient, Auth, Config, Resilience)
  ↓
Application (Conduit)
```

---

# 🔬 Low-Level Design (LLD)

## 🔹 Core Layer

Handles all infrastructure:

* **API**

  * `APIClient.ts` → HTTP abstraction
  * `APIRequestExecutor.ts` → Retry + Rate limiting

* **Auth (Strategy Pattern)**

  * JWT / OAuth support
  * Token lifecycle:

    * TokenCache
    * TokenManager
    * TokenRefresher

* **Config**

  * Environment-based configs (QA / PROD)

* **Resilience**

  * RetryExecutor
  * RateLimiter

* **Contracts & Validators**

  * JSON schema validation
  * Contract enforcement

* **Logger & Reporting**

  * Central logging
  * Allure integration

---

## 🔹 Agent Layer (`src/agents`) ⭐

Agents provide:

* Auto-authentication
* Smart defaults
* Data generation
* Reduced boilerplate

Example:

```ts
await articleAgent.createValidArticle();
```

---

## 🔹 Domain Layer (`src/domain`)

Business abstraction layer:

```text
auth/
article/
```

Each contains:

* API (`*.api.ts`)
* UI (`*.page.ts`)
* Flow (`*.flow.ts`)

---

## 🔹 Data Layer (`src/data`)

* **factories/** → dynamic data generation
* **test-data/** → static scenarios

---

## 🔹 Endpoints Layer (`src/endpoints`)

Centralized API route definitions.

---

## 🔹 Resources (`src/resources`)

* Environment configs
* JSON schemas

---

## 🔹 Test Runners (`src/test-runners`)

* Regression config
* Extendable for smoke/sanity

---

## 🔹 CI/CD (`src/ci-cd`) ⚙️

* GitHub Actions / Jenkins pipelines
* Supports:

  * Test execution
  * Reporting
  * Parallel runs

---

# 📁 Actual Folder Structure

```text
CONDUIT-PLAYWRIGHT-AGENTIC-QA/
│
├── allure-report/
├── allure-results/
├── node_modules/
│
├── src/
│   ├── agents/
│   │   ├── apiAgent.ts
│   │   ├── dataAgent.ts
│   │   ├── selectorAgent.ts
│   │   ├── testAgent.ts
│   │
│   ├── ci-cd/
│   │   ├── github-actions.yml
│   │   ├── jenkinsfile
│   │
│   ├── core/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── base/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── contracts/
│   │   ├── factory/
│   │   ├── logger/
│   │   ├── reporting/
│   │   ├── resilience/
│   │   ├── utils/
│   │   ├── validators/
│   │
│   ├── data/
│   │   ├── factories/
│   │   ├── test-data/
│   │
│   ├── domain/
│   │   ├── article/
│   │   ├── auth/
│   │
│   ├── endpoints/
│   │   ├── endpoints.ts
│   │
│   ├── resources/
│   │   ├── config/
│   │   ├── schema/
│   │
│   ├── test-runners/
│   │   ├── regression.config.ts
│   │
│   ├── tests/
│   │   ├── api/
│   │   ├── ui/
│   │   
│   │
│   ├── tsconfig.json
│
├── test-results/
├── .gitignore
├── package.json
├── README.md
├── DECISIONS.md
├── AI_USAGE.md
```

---

# 🧪 Running Tests

## Install

```bash
npm install
npx playwright install
```

---

## Run All Tests

```bash
npx playwright test
```

---

## Run Regression

```bash
npx playwright test --config=src/test-runners/regression.config.ts
```

---

# 📊 Allure Reporting

```bash
npx allure generate ./allure-results --clean
npx allure open
```

---

# 🔐 Authentication

Strategy-based design:

```ts
new JWTAuthStrategy(request, {
  email: ConfigManager.get("user.email"),
  password: ConfigManager.get("user.password")
});
```

---

# 🔁 Resilience

* Automatic retries
* Rate limiting
* Central execution via `APIRequestExecutor`

---

# 🤖 Agentic Advantage

| Feature          | Benefit                 |
| ---------------- | ----------------------- |
| Agents           | Reduce boilerplate      |
| Strategy Pattern | Extensible auth         |
| Domain Layer     | Clean separation        |
| Factories        | Dynamic data            |
| Test Data        | Deterministic scenarios |

---

# 🧪 Example

```ts
test("Create article", async ({ apiClient, request }) => {

 const articleAgent = new ArticleAgent(apiClient, authStrategy);
  const testData = ArticleFactory.validArticle();
  const article = await articleAgent.createAndGetValidArticle(testData);

  expect(article.title).toBe(testData.title);
  expect(article.description).toBe(testData.description);
  expect(article.body).toContain('Playwright');
  expect(article.author.username).toBeDefined();
});
```


---

Reports:
## 📊 Test Reporting (Allure)

This framework integrates Allure for rich and debuggable test reporting.

### ✨ Highlights
- Step-level execution tracking
- API request/response logging
- Auto-generated cURL for failures
- Severity, feature, and story tagging

Sample reports:
<img width="1898" height="1006" alt="Screenshot 2026-04-28 at 5 41 59 PM" src="https://github.com/user-attachments/assets/386e885d-35ca-4807-b169-e7feeb4b54ba" />

<img width="1910" height="1012" alt="Screenshot 2026-04-28 at 5 42 11 PM" src="https://github.com/user-attachments/assets/4e292cf1-1a92-4cc9-9c44-36945d389e64" />



📁 A full sample report is included in the repository:  
👉 [`/allure-report`](allure-report/)

> Open `index.html` inside the folder to explore the report locally.

Samples are in folder -> src/core/reporting.

To generate a fresh report locally:

```bash
npx playwright test
allure generate ./allure-results --clean -o ./allure-report
allure open ./allure-report


# 🧠 Final Thought

> This framework is built not just for automation —
> but for **AI-assisted, future-ready QA engineering**

---


# 👨‍💻 Author

Geetansh Bhatia
