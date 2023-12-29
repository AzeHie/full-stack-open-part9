import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Diary from './components/Diary';
import MainHeader from './components/MainHeader';
import { DiaryEntry } from './utils/Types';
import NewDiaryEntry from './components/NewDiaryEntry';

import './App.css';
import DiaryService from './services/DiaryService';

const App = () => {
  const [diary, setDiary] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiary = async () => {
      const diaryData = await DiaryService.getAll();

      setDiary(diaryData);
    };

    fetchDiary();
  }, []);

  const routes = (
    <Routes>
      <Route path='/' element={ <Diary diaryEntries={diary} />} />
      <Route path='/addentry' element={ <NewDiaryEntry />} />
    </Routes>
  )

  return (
      <div className='app__container'>
        <MainHeader />
        <main>{routes}</main>
      </div>
  );
};

export default App;
