const Blog = ({ blog, likeBlog, removeBlog, loggedUser }) => {

  if (!blog) {
    return null;
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    likeBlog(updatedBlog);
  }

  const madeByUser = (loggedUser && loggedUser.name === blog.user.name);

  return (
    <div className="blog">
      <h3 className='blog-full-title'>
        <span className='blog-author'>{blog.author}: </span>
        <span className='blog-title'>{blog.title}</span>
      </h3>

      <div className='blog-expanded'>
        <div className='blog-url'>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div className='blog-likes-container'>
          <span className='blog-likes'>likes {blog.likes}</span>
          {loggedUser &&
            <button
              className='blog-like-btn'
              onClick={handleLike}
            >
              like
            </button>
          }
        </div>
        <div className='blog-user'>
          Added by {blog.user.name}
        </div>
        {madeByUser &&
          <button
            className="blog-remove-btn"
            onClick={() => removeBlog(blog)}
          >
            remove
          </button>
        }

      </div>
    </div>
  )
}

export default Blog