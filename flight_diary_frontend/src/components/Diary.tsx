import { Fragment } from 'react';
import { DiaryEntry } from '../utils/Types';

import './Diary.css';

interface DiaryProps {
  diaryEntries: DiaryEntry[];
}

const Diary = (props: DiaryProps) => {
  return (
    <Fragment>
      <h1>Flight diary</h1>
      <table className='diary__table'>
        <thead className='diary__thead'>
          <tr>
            <th>Date</th>
            <th>Visibility</th>
            <th>Weather</th>
          </tr>
        </thead>
        <tbody className='diary__tbody'>
          {props.diaryEntries.map((e) => (
            <tr key={e.id}>
              <td>{e.date}</td>
              <td>{e.visibility}</td>
              <td>{e.weather}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Diary;
