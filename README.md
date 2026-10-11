# Ottometric Demo

UI and API tests written in TypeScript with Playwright.  
Original assignment: `Task.dm`.

## Setup

Requires Node.js 20–25 and Java on PATH for the Allure CLI.

```bash
npm ci
npx playwright install chromium
```

Create `.env` in the project root using `.env.example` as a reference:

```dotenv
SAUCE_STANDARD_USERNAME="enter value"
SAUCE_PASSWORD="enter value"
```

Replace the placeholders with the `standard_user` credentials listed in `Task.dm`.

The local `.env` is ignored by Git. Application URLs are configured in `config/env.ts`. GoREST GET requests do not use a token.

## Run

Run commands from the project root in PowerShell or Git Bash.

| Command | Purpose |
|---|---|
| `npm test` | Run all four tests |
| `npm run test:api` | Run GoREST API tests |
| `npm run test:ui` | Run SauceDemo checkout test |
| `npm run test:ui:debug` | Debug the UI test |
| `npm run typecheck` | Check TypeScript types |
| `npm run report:open` | Open the Playwright HTML report |
| `npm run clean` | Remove previous Allure results and report |
| `npm run allure:report:open` | Generate and open the Allure report after a test run |

UI tests run headed locally and headless when `CI` is set.

All test commands clear previous Allure results and the report before running. Use `npm test` to include both API and UI results in one report; separate runs replace previous results.

## GitHub Actions

Add repository secrets `SAUCE_STANDARD_USERNAME` and `SAUCE_PASSWORD` for UI runs.

In GitHub Actions, select **Playwright tests**, click **Run workflow**, and choose `all`, `ui`, or `api`.

Reports are saved as artifacts, including after test failures.

## Test Coverage

- **TEST 1:** Retrieve a non-empty list of users.
- **TEST 2:** Find at least one name starting with uppercase `C` in the returned list.
- **TEST 3:** Retrieve a non-empty list and print the user objects in the console.
- **TEST 4:** Log in as `standard_user`, buy the first listed product, complete checkout, return to products, and log out.

GoREST tests check one response page. Public data changes, so TEST 2 fails if that page has no matching name.

UI tests use Page Objects and check each stage of the purchase. API requests are handled by `UserConnector`, and users are stored as `UserResponse[]`.

Given/When/Then/And helpers wrap Playwright steps for reporting.

The UI test saves a successful checkout screenshot. Screenshots, video, and traces are retained on UI failures in `test-results/`.

Generated reports are ignored by Git.