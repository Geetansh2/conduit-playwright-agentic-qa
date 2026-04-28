# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/auth/login.api.spec.ts >> API: Login should fail with invalid credentials
- Location: src/tests/api/auth/login.api.spec.ts:26:5

# Error details

```
Error: apiRequestContext.post: connect ECONNREFUSED ::1:3000
Call log:
  - → POST http://localhost:3000/api/users/login
    - user-agent: Playwright/1.59.1 (arm64; macOS 15.6) node/24.8
    - accept: application/json
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - content-length: 59

```