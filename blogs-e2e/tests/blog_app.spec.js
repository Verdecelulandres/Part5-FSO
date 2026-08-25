/* eslint-disable no-undef */
const { test, expect, beforeEach, describe } = require('@playwright/test');
const { login } = require('./helper');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/test/reset');
    await request.post('/api/users', {
      data: {
        username: 'test',
        password: 'password',
        name: 'Test user'
      }
    });
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

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, 'test', 'password');

      await expect(page.getByText('Test user logged in')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'test', 'wrong');

      const errorMsg = page.locator('.error');
      await expect(errorMsg).toContainText('wrong username or password');
      await expect(errorMsg).toHaveCSS('border-style', 'solid');
      await expect(errorMsg).toHaveCSS('color', 'rgb(255, 0, 0)');
      await expect(page.getByText('Test user logged in')).not.toBeVisible();
    });
  });

});