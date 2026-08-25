/* eslint-disable no-undef */
const { test, expect, beforeEach, describe } = require('@playwright/test');

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    const usernameInput = await page.getByRole('textbox', { name: 'username' });
    const pwdInput = await page.getByRole('textbox', { name: 'password' });
    const loginBtn = await page.getByRole('button', { name: 'login' });

    await expect(usernameInput).toBeVisible();
    await expect(pwdInput).toBeVisible();
    await expect(loginBtn).toBeVisible();
  });
});