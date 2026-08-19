const Notification = ({ message, isError }) => {
  const baseClass = `notification ${isError ? 'error' : 'success'}`;
  return (
    <p className={baseClass}>{message}</p>
  );
}

export default Notification;