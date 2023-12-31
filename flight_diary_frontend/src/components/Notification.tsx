import './Notification.css';

interface NotificationProps {
  message: string;
  style: string;
  clearNotification: () => void;
}

const Notification = (props: NotificationProps) => {
  const { message, style, clearNotification } = props;

  if (!message) {
    return null;
  }

  return (
    <div className={`notification__${style}`}>
      <p>{message} </p>
      <button onClick={clearNotification}>Close</button>
    </div>
  );
};

export default Notification;
