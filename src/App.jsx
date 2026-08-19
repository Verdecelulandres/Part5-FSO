import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';
import Notification from './components/Notification';
import User from './components/User';
import Blog from './components/Blog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');
  const [notificationMsg, setNotificationMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const userStorageStr = 'blogAppUser';

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, []);

  useEffect(() => {
    const storedUser = window.localStorage.getItem(userStorageStr);
    if (storedUser) {
      const loggedInUser = JSON.parse(storedUser);
      blogService.setToken(loggedInUser.token);
      setUser(loggedInUser);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const JSONusr = await loginService.login({ username, password });
      if (JSONusr) {
        setUser(JSONusr);
        setUsername('');
        setPassword('');
        window.localStorage.setItem(userStorageStr, JSON.stringify(JSONusr));
        blogService.setToken(JSONusr.token);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      displayNotification('wrong username or password');
    }
  }

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem(userStorageStr);
  }

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

  const handleNewBlog = async event => {
    event.preventDefault();
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    try {
      const savedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(savedBlog));
      setBlogTitle('');
      setBlogAuthor('');
      setBlogUrl('');
      displayNotification(`a new blog ${savedBlog.title} by ${savedBlog.author} added`);
    } catch (error) {
      console.error(error);
      setIsError(true);
      displayNotification(error.response.data.error);
    }
  }

  const displayNotification = (msg) => {
    setNotificationMsg(msg);

    setTimeout(() => {
      setNotificationMsg('');
      setIsError(false);
    }, 5000);
  }

  return (
    <div>
      {!user &&
        <>
          <h2>Login to application</h2>
          {notificationMsg &&
            <Notification
              message={notificationMsg}
              isError={isError}
            />
          }
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            handlePassword={({ target }) => setPassword(target.value)}
            handleUsername={({ target }) => setUsername(target.value)}
          />
        </>
      }
      {user &&
        <>
          <h2>blogs</h2>
          {notificationMsg &&
            <Notification
              message={notificationMsg}
              isError={isError}
            />
          }
          <User
            name={user.name}
            handleLogout={handleLogout}
          />
          <CreateBlogForm
            blogAuthor={blogAuthor}
            blogTitle={blogTitle}
            blogUrl={blogUrl}
            handleBlogChange={handleBlogChange}
            handleNewBlog={handleNewBlog}
          />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      }

    </div>
  )
}

export default App