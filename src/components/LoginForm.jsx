const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
  return (
    <>
      <h1>Login to application</h1>
      <form onSubmit={handleSubmit}>
        <label>
          username
          <input 
            onChange={handleChange}
            value={username}
          />
        </label>
        <label>
          password
          <input 
            onChange={handleChange}
            value={password}
          />
        </label>
        <button type="submit">login</button>
      </form>
    </>
  );
}

export default LoginForm;