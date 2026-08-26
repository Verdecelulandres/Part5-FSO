import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ login }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = event => {
    event.preventDefault();
    login({ username, password });
    setUsername('');
    setPassword('');
    navigate('/');
  }

  return (
    <>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>

    </>
  );
}

export default LoginForm;