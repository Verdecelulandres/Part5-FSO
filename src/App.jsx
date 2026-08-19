import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    const usr = await loginService.login({ username, password });
    if (usr) {
      setUser(usr);
      setUsername('');
      setPassword('');
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
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      }

    </div>
  )
}

export default App