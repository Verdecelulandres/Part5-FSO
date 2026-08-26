import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  // const [notificationMsg, setNotificationMsg] = useState('');
  // const [isError, setIsError] = useState(false);

  // const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, []);

  const userStorageStr = 'blogAppUser';


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
      // setIsError(true);
      // displayNotification('wrong username or password');
    }
  }

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem(userStorageStr);
  }

  const handleNewBlog = async newBlog => {
    // blogFormRef.current.toggleVisibility();
    try {
      const savedBlog = await blogService.create(newBlog);
      // const userId = savedBlog.user;
      // savedBlog.user = { id: userId, name: user.name, username: user.username };
      setBlogs(blogs.concat(savedBlog));

      // displayNotification(`a new blog ${savedBlog.title} by ${savedBlog.author} added`);
    } catch (error) {
      console.error(error);
      // setIsError(true);
      // displayNotification(error.response.data.error);
    }
  }

  const likeBlog = async (updatedBlog) => {
    try {
      const likedBlog = await blogService.like(updatedBlog);

      setBlogs(blogs.map(b => {
        if (b.id === updatedBlog.id) {
          const fullUser = b.user;
          b = likedBlog;
          b.user = fullUser;
        }
        return b;
      }));
    } catch (error) {
      console.log(error);
    }
  }

  const removeBlog = async (blogToDelete) => {
    const { title, id, author } = blogToDelete;
    if (!window.confirm(`Remove blog ${title} by ${author}?`)) {
      return;
    }
    try {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  // const displayNotification = (msg) => {
  //   setNotificationMsg(msg);

  //   setTimeout(() => {
  //     setNotificationMsg('');
  //     setIsError(false);
  //   }, 5000);
  // }

  return (
    <Router>
      <div className='navbar'>
        <Link to="/">blogs</Link>
        <Link to="/login">login</Link>
      </div>
      <Routes>
        <Route path="/" element={
          <BlogList blogs={blogs} />
        } />
        <Route path="/login" element={
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            handlePassword={({ target }) => setPassword(target.value)}
            handleUsername={({ target }) => setUsername(target.value)}
          />
        } />
      </Routes>
    </Router>
  )
}

export default App