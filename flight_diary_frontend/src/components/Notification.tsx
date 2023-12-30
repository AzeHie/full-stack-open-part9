import './Notification.css';

interface NotificationProps {
  message: string,
  style: string;
}

const Notification = (props: NotificationProps) => {
  const {message, style} = props;

  if (!message) {
    return null;
  }

  return (
    <div>
      <p className={`notification__${style}`}>{message}</p>
    </div>
  )
};

export default Notification;