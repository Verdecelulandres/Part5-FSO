/* eslint-disable no-undef */
const { test, expect, beforeEach, describe } = require('@playwright/test');
const { login, createBlog, getExpandedBlogContainer, likeBlog } = require('./helper');

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
    await page.goto('/login');
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

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await login(page, 'test', 'password');
      });

      test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'Test blog', 'Test Author', 'www.test.com');

        await expect(page.getByText('Test blog', { exact: true })).toBeVisible();
      });

      describe('When blogs exist', () => {
        beforeEach(async ({ page }) => {
          await createBlog(page, 'blog1', 'author1', 'www.blog1.com');
          await createBlog(page, 'blog2', 'author2', 'www.blog2.com');
        });

        test('a blog can be liked', async ({ page }) => {
          // Testing with last blog in list.
          const blogDiv = await getExpandedBlogContainer(page, 'blog2');
          const likesDiv = blogDiv.locator('.blog_likes');
          await expect(likesDiv).toContainText('likes 0');
          await likeBlog(blogDiv);
          await expect(likesDiv).toContainText('likes 1');
        });

        describe('When deleting', () => {
          test('blog creator can delete a blog', async ({ page }) => {
            const blogDiv = await page.getByText('blog2', { exact: true }).locator('../..');
            await blogDiv.getByRole('button', { name: 'view' }).click();
            page.on('dialog', dialog => dialog.accept());
            await blogDiv.getByRole('button', { name: 'remove' }).click();
            await expect(blogDiv).not.toBeVisible();
          });

          test('only blog creator sees remove button', async ({ page, request }) => {
            await request.post('/api/users', {
              data: {
                username: 'other',
                password: 'password',
                name: 'Other user'
              }
            });
            await page.getByRole('button', { name: 'logout' }).click();
            await login(page, 'other', 'password');
            await createBlog(page, 'blog3', 'author3', 'www.blog3.com');

            const ownBlog = await getExpandedBlogContainer(page, 'blog3');
            const otherBlog = await getExpandedBlogContainer(page, 'blog1');

            await expect(ownBlog.getByRole('button', { name: 'remove' })).toBeVisible();
            await expect(otherBlog.getByRole('button', { name: 'remove' })).not.toBeVisible();
          });

        });

        describe('When liking', () => {
          beforeEach(async ({ page }) => {
            const blog1 = await getExpandedBlogContainer(page, 'blog1');
            const blog2 = await getExpandedBlogContainer(page, 'blog2');
            await likeBlog(blog2);
            await likeBlog(blog2);
            await likeBlog(blog1);
          });

          test('blogs are sorted according to likes descendently', async ({ page }) => {
            const allBlogs = await page.locator('.blog');
            await page.pause();
            await allBlogs.first().getByRole('button', { name: 'hide' });
            await allBlogs.last().getByRole('button', { name: 'hide' });
            await expect(allBlogs.first().locator('.blog_likes')).toContainText('likes 2');
            await expect(allBlogs.first().locator('.blog_title')).toContainText('blog2');
            await expect(allBlogs.last().locator('.blog_likes')).toContainText('likes 1');
            await expect(allBlogs.last().locator('.blog_title')).toContainText('blog1');
          });

        });
      });
    });
  });
});