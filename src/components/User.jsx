const User = ({ name, handleLogout }) => {
  return (
    <>
      <span>
        {name} logged in
      </span>
      <button onClick={handleLogout}>logout</button>
    </>
  );
}

export default User;