import { useCallback, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Diary from './components/Diary';
import MainHeader from './components/MainHeader';
import { DiaryEntry } from './utils/Types';
import NewDiaryEntry from './components/NewDiaryEntry';

import './App.css';
import DiaryService from './services/DiaryService';
import Notification from './components/Notification';

const App = () => {
  const [diary, setDiary] = useState<DiaryEntry[]>([]);
  const [notificationStyle, setNotificationStyle] = useState('');
  const [message, setMessage] = useState('');

  const newNotification = (newMessage: string, newStyle: string) => {
    setMessage(newMessage);
    setNotificationStyle(newStyle);
    setTimeout(() => {
      setMessage('');
      setNotificationStyle('');
    }, 9000);
  };

  const clearNotificationManually = () => {
    setMessage('');
    setNotificationStyle('');
  }

  const reFetchDiary = useCallback(async () => {
    const diaryData = await DiaryService.getAll(newNotification);

    if (!diaryData) {
      newNotification('Failed to fetch data!', 'error');
      throw new Error('Failed to fetch data!');
    }

    setDiary(diaryData);
  }, []);

  useEffect(() => {
    const fetchDiary = async () => {
      const diaryData = await DiaryService.getAll(newNotification);

      if (!diaryData) {
        newNotification('Failed to fetch data!', 'error');
        throw new Error('failed to fetch data!');
      }

      setDiary(diaryData);
    };

    fetchDiary();
  }, []);

  const routes = (
    <Routes>
      <Route path='/' element={ <Diary diaryEntries={diary} />} />
      <Route path='/addentry' element={ <NewDiaryEntry reFetchDiary={reFetchDiary} newNotification={newNotification} />} />
    </Routes>
  )

  return (
      <div className='app__container'>
        <MainHeader />
        <Notification message={message} style={notificationStyle} clearNotification={clearNotificationManually}/>
        <main>{routes}</main>
      </div>
  );
};

export default App;
