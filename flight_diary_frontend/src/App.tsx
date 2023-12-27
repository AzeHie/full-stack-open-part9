import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import './App.css';
import { DiaryEntry } from './utils/Types';
import Diary from './components/Diary';

const App = () => {
  const [diary, setDiary] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const result = await axios.get<DiaryEntry[]>(
          `http://localhost:3000/api/diaries`
        );

        const sortedData = result.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        console.log(sortedData);
        setDiary(result.data);
      } catch (err) {
        console.log(err);
        throw new Error('Something went wrong!');
      }
    };

    fetchDiary();
  }, []);

  return (
    <Fragment>
      <Diary diaryEntries={diary} />
    </Fragment>
  );
};

export default App;
