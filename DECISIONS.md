# 📄 DECISIONS.md

## 1. Agentic Layer over Traditional Test Architecture

### ✅ Decision

Introduced an **Agent Layer** (`core/agents`) on top of API and UI layers to abstract orchestration logic such as authentication, data generation, and execution flows.

### ❌ Alternatives Considered

* Direct usage of Page Objects + API classes in tests
* Service/flow layer without agent abstraction

### 🤔 Why This Decision

Traditional frameworks tightly couple tests with implementation details, which breaks when AI-generated code is introduced.

The Agent Layer:

* Encapsulates decision-making (auth, retries, data)
* Makes the framework **AI-friendly and extensible**

### 🔁 What Would Change This Decision

* Very small projects where agents add unnecessary complexity
* No AI-assisted development usage

---

## 2. Domain-Driven Structure

### ✅ Decision

Organized the framework by **business domains** instead of technical layers.

```
domain/
  auth/
  article/
```

### ❌ Alternatives Considered

* Layer-based structure (pages/, api/, utils/)

### 🤔 Why This Decision

* Improves discoverability
* Aligns with real-world business logic
* Easier for AI tools to understand intent

### 🔁 What Would Change This Decision

* Small applications where a flat structure is sufficient

---

## 3. Strategy Pattern for Authentication

### ✅ Decision

Implemented authentication using **Strategy Pattern**:

* JWTAuthStrategy
* OAuthStrategy

### ❌ Alternatives Considered

* Hardcoded tokens
* Single auth implementation

### 🤔 Why This Decision

* Supports multiple authentication types
* Easily extensible
* Decouples auth logic from API layer

### 🔁 What Would Change This Decision

* If application uses only one fixed auth mechanism

---

## 4. Token Management (Cache + Refresh)

### ✅ Decision

Built a centralized token system:

* TokenCache → in-memory caching
* TokenRefresher → fetch new tokens
* TokenManager → orchestration

### ❌ Alternatives Considered

* Fetch token before every request
* Hardcoded token

### 🤔 Why This Decision

* Reduces redundant API calls
* Improves performance
* Centralizes token lifecycle

### 🔁 What Would Change This Decision

* Very short-lived or request-scoped tokens



## 5. Centralized API Client with Execution Pipeline

### ✅ Decision

Created a unified APIClient with:

* Auth injection
* Logging (including cURL generation)
* Execution via APIRequestExecutor

### ❌ Alternatives Considered

* Direct Playwright request usage in tests
* Scattered API calls

### 🤔 Why This Decision

* Standardizes API interactions
* Improves debugging
* Enables plug-in architecture (retry, rate limiting, auth)

### 🔁 What Would Change This Decision

* Very small test suites

---

## 6. Allure Reporting Integration

### ✅ Decision

Integrated Allure reporting with:

* Step-level logs
* Metadata (epic, feature, severity)
* API request/response debugging

### ❌ Alternatives Considered

* Default Playwright reporter
* Console logs only

### 🤔 Why This Decision

* Rich debugging capability
* Better visualization
* Industry-standard reporting

### 🔁 What Would Change This Decision

* Lightweight reporting requirements

---

## 🧠 Final Thought

```
Scalability + Maintainability + AI Compatibility
```

This framework is designed not just for automation, but for:

* Seamless integration with AI-generated code
* Clean abstractions
* Long-term scalability
