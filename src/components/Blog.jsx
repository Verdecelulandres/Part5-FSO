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
      <h3 className='blog_title'>
        <span className='blog_author'>{blog.author}: </span>
        <span className='blog_title'>{blog.title}</span>
      </h3>

      <div className='blog_expanded'>
        <div className='blog_url'>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div className='blog_likes'>
          <span>likes {blog.likes}</span>
          {loggedUser &&
            <button onClick={handleLike}>like</button>
          }
        </div>
        <div className='blog_user'>
          Added by {blog.user.name}
        </div>
        {madeByUser &&
          <button onClick={() => removeBlog(blog)}>remove</button>
        }

      </div>
    </div>
  )
}

export default Blog