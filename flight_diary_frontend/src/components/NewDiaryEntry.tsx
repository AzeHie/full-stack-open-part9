import { useState } from 'react';
import DiaryService from '../services/DiaryService';
import './NewDiaryEntry.css';
import { useNavigate } from 'react-router-dom';

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
          type='date'
          id='date'
          name='date'
          value={formData.date}
          onChange={handleChange}
        />
        <label htmlFor='weather'>Weather</label>
        <input
          type='text'
          id='weather'
          name='weather'
          value={formData.weather}
          onChange={handleChange}
        />
        <label htmlFor='visibility'>Visibility:</label>
        <input
          type='text'
          id='visibility'
          name='visibility'
          value={formData.visibility}
          onChange={handleChange}
        />
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
