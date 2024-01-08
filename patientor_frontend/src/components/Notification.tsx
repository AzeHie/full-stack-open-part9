import './Notification.css'; 

interface Props {
  notificationMessage: string;
  closeNotification: () => void;
}

const Notification = ({ notificationMessage, closeNotification }: Props) => {
  if (!notificationMessage) {
    return null;
  }

  return (
    <div className='notification'>
      <p>{notificationMessage}</p>
      <button onClick={closeNotification}>Close</button>
    </div>
  );
};

export default Notification;
