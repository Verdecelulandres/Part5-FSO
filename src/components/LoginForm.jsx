const LoginForm = ({ handleLogin, handleUsername, handlePassword, username, password }) => {
  return (
    <>
      <h1>Login to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              onChange={handleUsername}
              value={username}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              onChange={handlePassword}
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