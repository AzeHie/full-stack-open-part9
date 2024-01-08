import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { NotificationContextProvider } from './contexts/NotificationContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NotificationContextProvider>
    <App />
  </NotificationContextProvider>
);
