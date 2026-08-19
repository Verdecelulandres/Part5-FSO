import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import User from './components/User';
import Blog from './components/Blog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const userStorageStr = 'blogAppUser';

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, []);

  useEffect(() => {
    const storedUser = window.localStorage.getItem(userStorageStr);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    const JSONusr = await loginService.login({ username, password });
    if (JSONusr) {
      setUser(JSONusr);
      setUsername('');
      setPassword('');
      window.localStorage.setItem(userStorageStr, JSON.stringify(JSONusr));
    }
  }

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem(userStorageStr);
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
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      }

    </div>
  )
}

export default App