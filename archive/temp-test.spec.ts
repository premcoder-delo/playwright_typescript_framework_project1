import { expect } from '@playwright/test'
import { test } from '../fixtures/hooks-fixture';


test('temp-test', async ({ page, gotoUrl, logout }) => {
  console.log(await page.title());
})

test('temp-test2', async ({ page, gotoUrl, logout }) => {
  expect(page).toHaveTitle('OrangeHRM');
})

test('temp-test3', async ({ page, gotoUrl, logout }) => {
  expect(page).toHaveTitle('OrangeHRM');
})