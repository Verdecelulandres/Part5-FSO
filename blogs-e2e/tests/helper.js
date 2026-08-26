const login = async (page, username, password) => {
  await page.goto('/login');
  await page.getByRole('heading', { name: 'Login to application' }).waitFor();
  await page.getByLabel('username').fill(username);
  await page.getByLabel('password').fill(password);
  await page.getByRole('button', { name: 'login' }).click();
  await page.getByRole('heading', { name: 'blogs' }).waitFor();
}

const createBlog = async (page, title, author, url) => {
  await page.goto('/create');
  await page.getByLabel('title:').fill(title);
  await page.getByLabel('author:').fill(author);
  await page.getByLabel('url:').fill(url);
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByText(title, { exact: true }).waitFor();
}

const getExpandedBlogContainer = async (page, blogToFind) => {
  const blogDiv = await page.getByText(blogToFind, { exact: true }).locator('../..');
  await blogDiv.getByRole('button', { name: 'view' }).click();
  return blogDiv;
}

const likeBlog = async (page) => {
  let likeSpanContent = await page
    .getByText(/^likes \d$/)
    .textContent();
  likeSpanContent = likeSpanContent.split(' ');
  likeSpanContent[1] = String(Number(likeSpanContent[1]) + 1);
  likeSpanContent = likeSpanContent.join(' ');

  await page.getByRole('button', { name: 'like' }).click();
  await page.getByText(likeSpanContent, { exact: true }).waitFor();
}

export { login, createBlog, getExpandedBlogContainer, likeBlog }