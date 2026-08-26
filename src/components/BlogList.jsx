import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [notificationMsg, setNotificationMsg] = useState('');
  // const [isError, setIsError] = useState(false);

  // const blogFormRef = useRef();

  // const handleNewBlog = async newBlog => {
  //   blogFormRef.current.toggleVisibility();
  //   try {
  //     const savedBlog = await blogService.create(newBlog);
  //     const userId = savedBlog.user;
  //     savedBlog.user = { id: userId, name: user.name, username: user.username };
  //     setBlogs(blogs.concat(savedBlog));

  //     displayNotification(`a new blog ${savedBlog.title} by ${savedBlog.author} added`);
  //   } catch (error) {
  //     console.error(error);
  //     setIsError(true);
  //     displayNotification(error.response.data.error);
  //   }
  // }

  // const likeBlog = async (updatedBlog) => {
  //   try {
  //     const likedBlog = await blogService.like(updatedBlog);

  //     setBlogs(blogs.map(b => {
  //       if (b.id === updatedBlog.id) {
  //         const fullUser = b.user;
  //         b = likedBlog;
  //         b.user = fullUser;
  //       }
  //       return b;
  //     }));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const removeBlog = async (blogToDelete) => {
  //   const { title, id, author } = blogToDelete;
  //   if (!window.confirm(`Remove blog ${title} by ${author}?`)) {
  //     return;
  //   }
  //   try {
  //     await blogService.deleteBlog(id);
  //     setBlogs(blogs.filter(b => b.id !== id));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div>
      <>
        <h2>blogs</h2>
        {/* <User
          name={user.name}
          handleLogout={handleLogout}
        /> */}
        {/* <Togglable
          btnLabel="create new blog"
          ref={blogFormRef}
        >
          <CreateBlogForm
            createNewBlog={handleNewBlog}
          />
        </Togglable> */}
        <ul>
          {
            blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog => (
                <li key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </li>
              ))
          }
        </ul>
      </>

    </div>
  )
}

export default BlogList;