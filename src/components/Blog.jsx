import { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, loggedUser }) => {

  const [viewFull, setViewFull] = useState(false);

  const toggleFullView = () => {
    setViewFull(!viewFull);
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    likeBlog(updatedBlog);
  }

  const madeByUser = loggedUser.name === blog.user.name;

  return (
    <div className="blog">
      <div className='blog_default'>
        <span className='blog_title'>{blog.title} </span>
        <span className='blog_author'>{blog.author}</span>
        <button onClick={toggleFullView}>
          {viewFull ? 'hide' : 'view'}
        </button>
      </div>
      {viewFull &&
        <div className='blog_expanded'>
          <div className='blog_url'>{blog.url}</div>
          <div className='blog_likes'>
            <span>likes {blog.likes}</span>
            <button onClick={handleLike}>like</button>
          </div>
          <div className='blog_user'>{blog.user.name}</div>
          {madeByUser &&
            <button onClick={() => removeBlog(blog)}>remove</button>
          }

        </div>
      }

    </div>
  )
}

export default Blog