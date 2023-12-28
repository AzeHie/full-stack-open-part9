import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Diary from './components/Diary';
import MainHeader from './components/MainHeader';
import { DiaryEntry } from './utils/Types';
import NewDiaryEntry from './components/NewDiaryEntry';

import './App.css';

const App = () => {
  const [diary, setDiary] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const result = await axios.get<DiaryEntry[]>(
          `http://localhost:3000/api/diaries`
        );

        const sortedData = result.data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setDiary(sortedData);
      } catch (err) {
        console.log(err);
        throw new Error('Something went wrong!');
      }
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
