import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import './App.css'
import { DiaryEntry } from './utils/Types';
import Diary from './components/Diary';

const App = () => {
  const [diary, setDiary] = useState<DiaryEntry[]>([]);


  useEffect(() => {
    const fetchDiary = async () => {
      const result = await axios.get<DiaryEntry[]>(`http://localhost:3000/api/diaries`);

      setDiary(result.data);
    };

    fetchDiary();
  }, [])

  return (
    <Fragment>
      <Diary diaryEntries={diary} />
    </Fragment>
  )
}

export default App;
