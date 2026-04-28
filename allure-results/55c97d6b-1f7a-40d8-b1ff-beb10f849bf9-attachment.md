# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/article/createArticle.api.spec.ts >> API: Create article should fail without authentication
- Location: src/tests/api/article/createArticle.api.spec.ts:41:5

# Error details

```
Error: apiRequestContext.post: connect ECONNREFUSED ::1:3000
Call log:
  - → POST http://localhost:3000/api/articles
    - user-agent: Playwright/1.59.1 (arm64; macOS 15.6) node/24.8
    - accept: application/json
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - content-length: 164

```