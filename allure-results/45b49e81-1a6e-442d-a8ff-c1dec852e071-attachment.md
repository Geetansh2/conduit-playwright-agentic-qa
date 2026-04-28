# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/article/createArticle.api.spec.ts >> API: Create article should fail with invalid token
- Location: src/tests/api/article/createArticle.api.spec.ts:62:5

# Error details

```
Error: apiRequestContext.post: connect ECONNREFUSED ::1:3000
Call log:
  - → POST http://localhost:3000/api/users/login
    - user-agent: Playwright/1.59.1 (arm64; macOS 15.6) node/24.8
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - content-type: application/json
    - content-length: 72

```