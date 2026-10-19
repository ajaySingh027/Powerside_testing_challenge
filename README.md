# Power Quality Monitor – Cypress E2E Tests

End-to-end test automation for the **Power Quality Monitor (PQM)** web application
(`https://testapp.andresfloresv.com`), built with **Cypress** and **TypeScript**.

The PQM app lets facility operators watch live power quality data, such as voltage, current and harmonics, across
monitored devices. It also lets them review power quality events (sags, swells, interruptions) against the ITIC
tolerance curve and manage alarms raised when device thresholds are breached.

---

## Prerequisites

- [Node.js](https://nodejs.org/) **v18 or later** (tested with v22)
- npm (comes with Node.js)
- Git
- Google Chrome (optional, to run tests in Chrome)

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ajaySingh027/Powerside_testing_challenge.git
cd Powerside_testing_challenge
```

### 2. Install dependencies
```bash
npm install
```
This installs Cypress and TypeScript. The Cypress binary is downloaded on first install.

To verify the install:
```bash
npx cypress verify
```

### 3. Configure credentials
Tests log in through the app's API using credentials from `cypress.env.json`.
This file is **git-ignored** and must be created locally in the project root:

```json
{
  "username": "<your-username>",
  "password": "<your-password>"
}
```

---

## Running the Tests

| Command | Description |
|---|---|
| `npm run cy:open` | Opens the Cypress Test Runner straight into E2E testing (interactive mode) to pick and watch specs run in a browser. |
| `npm run cy:run` | Runs all specs headless in the default Electron browser (CI-friendly). |
| `npm run cy:run:headed` | Runs all specs with the browser window visible. |
| `npm run cy:run:chrome` | Runs all specs headless in Google Chrome. |
| `npm run cy:run:dashboard` | Runs only the Dashboard spec. |

Run a specific spec, or pass any other Cypress option, by adding `--` after the script name:
```bash
npm run cy:run -- --spec "cypress/e2e/dashboard.spec.ts"
npm run cy:run -- --browser firefox
```

Test artifacts (screenshots on failure, videos, downloads) are written to `cypress/screenshots/`,
`cypress/videos/` and `cypress/downloads/`. These folders are git-ignored.

---

## Project Structure

```
Powerside_testing_challenge/
├── cypress/
│   ├── e2e/                         # Test specs (*.spec.ts)
│   │   ├── dashboard.spec.ts        # Side panel alarms, View all link, KPI cards
│   │   ├── devices.spec.ts          # Devices list search (name, location, no match)
│   │   ├── deviceSettings.spec.ts   # Device settings validation & reset
│   │   └── alarms.spec.ts           # Alarm acknowledge & resolve
│   ├── pages/                       # Page Objects (selectors + page actions)
│   │   ├── dashboard.page.ts
│   │   ├── devices.page.ts
│   │   ├── deviceDetails.page.ts
│   │   └── alarms.page.ts
│   ├── support/
│   │   ├── commands.ts              # Custom commands, e.g. cy.login() (API login cached with cy.session)
│   │   └── e2e.ts                   # Global support file
│   └── fixtures/                    # Static test data
│       └── dashboardSummary.json    # Stubbed /api/dashboard/summary response for KPI cards test
├── docs/                    # Test documentation (see below)
├── cypress.config.ts        # Cypress config (baseUrl, spec pattern)
├── cypress.env.json         # Local credentials (git-ignored, create manually)
└── package.json
```

### Design notes
- **Page Object Model:** each page has a class in `cypress/pages/` that holds its selectors and actions,
  so specs stay readable and selectors are kept in one place.
- **API login:** `cy.login()` authenticates via `POST /api/auth/login` and stores the token in local storage.
  The token is cached with `cy.session()`, so specs don't go through the UI login each time.

---

## Documentation (`docs/`)

| File | Contents |
|---|---|
| [`test_scenarios.md`](docs/test_scenarios.md) | Functional test scenarios for the application, grouped by module. Each has an ID, description, pre-conditions, steps and expected results. |
| [`bug_report.md`](docs/bug_report.md) | Defects found while testing the application, with severity, steps to reproduce, expected result and screenshots. |
| [`test_report.md`](docs/test_report.md) | Tester's feedback on the application: features liked, pain points and suggested improvements. |
| `image*.png` | Screenshots referenced in the bug report. |

### Application modules covered
| Module | Scenario IDs | What it covers |
|---|---|---|
| Onboarding | `TS-ONBD-xx` | "What's New" release-notes modal shown after login |
| Dashboard | `TS-DASH-xx` | KPI cards, live voltage graph, recent alarms side panel |
| Devices | `TS-DEV-xx` | Device list, search and filters, device detail page (current readings, voltage history, harmonic spectrum, power quality events, alarm history, device settings) |
| Events | `TS-EVT-xx` | Power quality events, ITIC compliance scatter plot, event detail page |
| Alarms | `TS-ALM-xx` | Alarm acknowledgement and resolution, threshold-based alarm triggering |

---

## Known Issues
- `dashboard.spec.ts` → *"should display the device detail page on clicking in side alarm panel"* is
  **expected to fail**. It catches a real application defect (alarm status mismatch). See **Bug 2** in
  [`bug_report.md`](docs/bug_report.md).
