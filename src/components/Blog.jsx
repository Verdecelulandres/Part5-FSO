import { useState } from "react"

const Blog = ({ blog }) => {

  const [viewFull, setViewFull] = useState(false);

  const toggleFullView = () => {
    setViewFull(!viewFull);
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
            <button>like</button>
          </div>
          <div>{blog.user.name}</div>
        </div>
      }

    </div>
  )
}

export default Blog