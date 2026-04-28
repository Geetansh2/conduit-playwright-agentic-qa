# 🤖 AI_USAGE.md

## Overview

This project was built with active assistance from AI tool (primarily ChatGPT).
The goal was not to outsource thinking, but to **accelerate implementation while maintaining architectural control**.

AI was used as:

* A **coding assistant** for boilerplate and scaffolding
* A **review partner** for validating patterns
* A **speed multiplier**, not a decision-maker

---

### 1. Authentication Strategy Design

**Prompt:**

```text
Implement authentication using strategy pattern for API automation
```

**AI Output:**

* Basic strategy interface
* Simple bearer token implementation

**What I improved:**

* Added:

  * TokenCache
  * TokenManager
  * TokenRefresher
* Introduced **multi-strategy support (JWT + OAuth)**

---

### 2. API Client Design

**Prompt:**

```text
Create reusable API client with Playwright request
```

**AI Output:**

* Basic GET/POST wrapper

**What I improved:**

* Added:

  * cURL generation for debugging
  * Central execution pipeline
  * Integration with Retry + RateLimiter
* Introduced **AuthStrategy injection**

---

### 3. Agentic Layer (Key Differentiator)

**Prompt:**

```text
What does agentic test framework mean?
```

**AI Output:**

* High-level explanation

**What I built:**

* DataAgent → dynamic data generation
* APIAgent → orchestration layer
* SelectorAgent → fallback handling

AI provided direction, but **actual design decisions were human-driven**

---

## ❌ Example Where AI Was Wrong

### Scenario: API Agent Design

**AI Suggestion:**

```ts
class APIAgent {
  createArticle() {}
  login() {}
  updateUser() {}
}
```

---

### 🚨 Problem Identified

* Violates **Single Responsibility Principle**
* Becomes a **God class**
* Not scalable
* Hard for AI tools to extend correctly

---

### ✅ My Correction

Refactored into **domain-specific agents**:

```text
agents/
  article/
    ArticleAgent.ts
  auth/
    AuthAgent.ts
  base/
    BaseApiAgent.ts
```

---

### 💡 Outcome

* Improved scalability
* Clear separation of concerns
* Better AI-assisted code generation

---

## 🚀 Final Takeaway

AI significantly improved development speed, but:

* Every output was **reviewed and validated**
* Critical components were **designed manually**
* Incorrect suggestions were **identified and corrected**

This ensured the framework remains:

* Scalable
* Maintainable
* Production-ready
* Truly **agentic-first**
