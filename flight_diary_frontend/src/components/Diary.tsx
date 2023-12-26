import { Fragment } from 'react';
import { DiaryEntry } from '../utils/Types';

interface DiaryProps {
  diaryEntries: DiaryEntry[];
}

const Diary = (props: DiaryProps) => {
  return (
    <Fragment>
      {props.diaryEntries.map((e) => (
        <div key={e.id}>
          {e.date}
          {e.visibility}
          {e.weather}
        </div>
      ))}
    </Fragment>
  );
};

export default Diary;
