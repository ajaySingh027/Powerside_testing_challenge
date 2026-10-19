import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://testapp.andresfloresv.com",
    specPattern: "cypress/e2e/**/*.spec.ts",
  },
});
