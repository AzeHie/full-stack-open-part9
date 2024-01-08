import React, { ReactNode, createContext, useState } from 'react';

interface NotificationContextProps {
  newNotification: (message: string) => void;
  closeNotification: () => void;
  notificationMessage: string;
}

export const NotificationContext = createContext<NotificationContextProps>({} as NotificationContextProps);


export const NotificationContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notificationMessage, setNotificationMessage] = useState<string>('');

  const newNotification = (message: string) => {
    setNotificationMessage(message);
  };

  const closeNotification = () => {
    setNotificationMessage('');
  };

  const contextValue = {
    newNotification,
    closeNotification,
    notificationMessage
  };

  return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>;
};





