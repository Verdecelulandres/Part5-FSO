import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import { expect, test } from 'vitest';

test('Renders certain blog parts by default', () => {
  const blog = {
    title: 'Test blog',
    author: 'test',
    url: 'www.test.com',
    likes: '1',
    user: {
      name: 'testUser',
      id: '1'
    }
  }

  const { container } = render(<Blog blog={blog} />);

  const defaultBlogData = container.querySelector('.blog_default');
  const expandedBlogData = container.querySelector('.blog_expanded');

  expect(defaultBlogData).toBeVisible();
  expect(expandedBlogData).toBeNull();

  const titleSpan = container.querySelector('.blog_title');
  const authorSpan = container.querySelector('.blog_author');

  expect(titleSpan).toHaveTextContent('Test blog');
  expect(authorSpan).toHaveTextContent('test');

});