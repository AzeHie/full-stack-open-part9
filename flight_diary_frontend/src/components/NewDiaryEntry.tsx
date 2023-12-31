import { useState } from 'react';
import DiaryService from '../services/DiaryService';
import { useNavigate } from 'react-router-dom';

import './NewDiaryEntry.css';

interface NewDiaryProps {
  reFetchDiary: () => void;
  newNotification: (message: string, style: string) => void;
}

const NewDiaryEntry = (props: NewDiaryProps) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: '',
    weather: '',
    visibility: '',
    comment: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await DiaryService.newEntry(formData, props.newNotification);

    // Don't continue if error occurred
    if (result === 'error occurred') {
      throw new Error('Failed to add new data');
    }

    props.reFetchDiary();
    navigate('/');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='new-diary-entry__form'>
        <label htmlFor='date'>Date:</label>
        <input
          className='new-diary-entry__date-input'
          type='date'
          id='date'
          name='date'
          value={formData.date}
          onChange={handleChange}
        />
        <fieldset>
          <legend>Weather</legend>
          <label>
            <input
              type='radio'
              name='weather'
              value='sunny'
              checked={formData.weather === 'sunny'}
              onChange={handleChange}
            />
            Sunny
          </label>
          <label>
            <input
              type='radio'
              name='weather'
              value='rainy'
              checked={formData.weather === 'rainy'}
              onChange={handleChange}
            />
            Rainy
          </label>
          <label>
            <input
              type='radio'
              name='weather'
              value='cloudy'
              checked={formData.weather === 'cloudy'}
              onChange={handleChange}
            />
            Cloudy
          </label>
          <label>
            <input
              type='radio'
              name='weather'
              value='stormy'
              checked={formData.weather === 'stormy'}
              onChange={handleChange}
            />
            Stormy
          </label>
          <label>
            <input
              type='radio'
              name='weather'
              value='windy'
              checked={formData.weather === 'windy'}
              onChange={handleChange}
            />
            Windy
          </label>
        </fieldset>
        <fieldset>
          <legend>Visibility</legend>
          <label>
            <input
              type='radio'
              name='visibility'
              value='great'
              checked={formData.visibility === 'great'}
              onChange={handleChange}
            />
            Great
          </label>
          <label>
            <input
              type='radio'
              name='visibility'
              value='good'
              checked={formData.visibility === 'good'}
              onChange={handleChange}
            />
            Good
          </label>
          <label>
            <input
              type='radio'
              name='visibility'
              value='ok'
              checked={formData.visibility === 'ok'}
              onChange={handleChange}
            />
            Ok
          </label>
          <label>
            <input
              type='radio'
              name='visibility'
              value='poor'
              checked={formData.visibility === 'poor'}
              onChange={handleChange}
            />
            Poor
          </label>
        </fieldset>
        <label htmlFor='comment'>Comment:</label>
        <input
          type='text'
          id='comment'
          name='comment'
          value={formData.comment}
          onChange={handleChange}
        />
        <div>
          <button type='submit'>Submit</button>
          <button type='button'>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NewDiaryEntry;
