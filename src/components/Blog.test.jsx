import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import { expect } from 'vitest';


describe('<Blog /> tests', () => {

  let blogContainer = null;

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
    blogContainer = container;
  });
  test('Renders certain blog parts by default', () => {

    const defaultBlogData = blogContainer.querySelector('.blog_default');
    const expandedBlogData = blogContainer.querySelector('.blog_expanded');

    expect(defaultBlogData).toBeVisible();
    expect(expandedBlogData).toBeNull();

    const titleSpan = blogContainer.querySelector('.blog_title');
    const authorSpan = blogContainer.querySelector('.blog_author');

    expect(titleSpan).toHaveTextContent('Test blog');
    expect(authorSpan).toHaveTextContent('test');
  });

  test('Show blog hidden data after clicked', async () => {
    const user = userEvent.setup();
    const viewBtn = screen.getByText('view');
    await user.click(viewBtn);

    const expandedBlogData = blogContainer.querySelector('.blog_expanded');

    expect(expandedBlogData).toBeVisible();

    const urlDiv = blogContainer.querySelector('.blog_url');
    const likesDiv = blogContainer.querySelector('.blog_likes');

    expect(urlDiv).toHaveTextContent('www.test.com');
    expect(likesDiv).toHaveTextContent('1');

  });
});