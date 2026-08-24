import { useState } from "react"

const Blog = ({ blog, likeBlog, removeBlog, madeByUser }) => {

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

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleFullView}>
          {viewFull ? 'hide' : 'view'}
        </button>
      </div>
      {viewFull &&
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {madeByUser &&
            <button onClick={() => removeBlog(blog)}>remove</button>
          }

        </div>
      }

    </div>
  )
}

export default Blog