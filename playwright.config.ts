import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const browsers = [{name:'chromium', use:{...devices['Desktop chrome']}}, {name: 'firefox', use:{...devices['Desktop firefox']}}, {name: 'webkit',use: { ...devices['Desktop Safari'] }}]
export default defineConfig({
  globalSetup: './global.setup.ts',
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    headless: process.env.CI ? true : false
  },

  /* Configure projects for major browsers */
  projects: [ ...browsers]
  
  // projects: [
  //   {
  //     name: 'login-tests-chromium',
  //     testMatch: '**/login.spec.ts',
  //     use: {...devices['Desktop Chrome']}
  //   },
  //   {
  //     name: 'app-tests-chromium',
  //     testMatch: '**/*.spec.ts',
  //     testIgnore: '**/login.spec.ts',
  //     use: { 
  //       ...devices['Desktop Chrome'],
  //       storageState: './storageState.json'
  //     },
  //   }]


  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
