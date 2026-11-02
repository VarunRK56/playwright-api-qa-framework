# Playwright TypeScript REST API QA Framework

Practice API: https://restful-booker.herokuapp.com/apidoc/index.html

## Setup (Windows PowerShell)

Install Node.js 22+ and optionally Java (for Allure CLI). Then:

```powershell
npm install
npm run typecheck
npm test
npm run test:report
```

No browser download is needed for API-only Playwright tests.

## Commands

- `npm test` — full API suite
- `npm run test:smoke` — smoke suite
- `npm run test:negative` — negative tests
- `npm run typecheck` — TypeScript type checking
- `npm run test:report` — HTML report
- `npm run test:allure` — execute and generate Allure report (requires Java)
- `npm run report:allure` — open generated Allure report

## Structure

- `api/` — typed endpoint client methods
- `fixtures/` — Playwright fixtures and test data factories
- `schemas/` — Zod response contract checks
- `tests/` — independent API scenarios
- `utils/` — create and cleanup helpers
- `.github/workflows/` — CI test execution on pull requests

## Configuration

Set environment variables `API_BASE_URL`, `BOOKER_USERNAME`, and `BOOKER_PASSWORD` to override defaults. Public Restful Booker uses the documented demo credentials. Do not commit real credentials.

## Important

Restful Booker is a public shared practice service. Records may be reset and service availability may fluctuate. The tests create unique records, use their own IDs, and delete most created records. Some tests intentionally validate documented non-2xx responses; APIRequestContext does not throw on those responses by default.

For a future PR QA Agent, the code organization maps endpoint clients to test files and supports targeted test selection.
