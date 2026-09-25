import {
  Before,
  After,
  setDefaultTimeout,
} from '@cucumber/cucumber';

import {
  chromium,
  Browser,
  BrowserContext,
  Page,
} from 'playwright';

import { env } from '../config/env';

setDefaultTimeout(30 * 1000);

let browser: Browser;
let context: BrowserContext;

export let page: Page;

Before(async () => {
  browser = await chromium.launch({
    headless: env.headless,
    slowMo: 500,
    args: ['--start-maximized'],
  });

  context = await browser.newContext({
    viewport: null,
  });

  page = await context.newPage();
});

After(async () => {
  await context.close();
  await browser.close();
});