import { useState } from "react";

const CreateBlogForm = ({ createNewBlog }) => {

  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const handleBlogChange = event => {
    const { name, value } = event.target;
    if (name === 'blogTitle') {
      setBlogTitle(value);
    } else if (name === 'blogAuthor') {
      setBlogAuthor(value);
    } else if (name === 'blogUrl') {
      setBlogUrl(value);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    createNewBlog(newBlog);
    setBlogTitle('');
    setBlogAuthor('');
    setBlogUrl('');
  }

  return (
    <>
      <h3>Create new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title:
            <input
              type="text"
              onChange={handleBlogChange}
              value={blogTitle}
              name="blogTitle"
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type="text"
              onChange={handleBlogChange}
              value={blogAuthor}
              name="blogAuthor"
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="text"
              onChange={handleBlogChange}
              value={blogUrl}
              name="blogUrl"
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
}

export default CreateBlogForm