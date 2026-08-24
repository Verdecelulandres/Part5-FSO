import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import { beforeEach, expect, test } from 'vitest';

describe('<Blog /> tests', () => {

  let cont = null;

  beforeEach(() => {
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
    cont = container;
  });
  test('Renders certain blog parts by default', () => {

    const defaultBlogData = cont.querySelector('.blog_default');
    const expandedBlogData = cont.querySelector('.blog_expanded');

    expect(defaultBlogData).toBeVisible();
    expect(expandedBlogData).toBeNull();

    const titleSpan = cont.querySelector('.blog_title');
    const authorSpan = cont.querySelector('.blog_author');

    expect(titleSpan).toHaveTextContent('Test blog');
    expect(authorSpan).toHaveTextContent('test');
  });

  test('');
});