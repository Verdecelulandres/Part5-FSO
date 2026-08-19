import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';
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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {!user &&
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handlePassword={({ target }) => setPassword(target.value)}
          handleUsername={({ target }) => setUsername(target.value)}
        />
      }
      {user &&
        <>
          <h2>blogs</h2>
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