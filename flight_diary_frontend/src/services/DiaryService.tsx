import axios from 'axios';
import { DiaryEntry } from '../utils/Types';

const getAll = async (newNotification: (message: string, style: string) => void) => {
  try {
    const result = await axios.get<DiaryEntry[]>(
      `http://localhost:3000/api/diaries`
    );

    const sortedData = result.data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    console.log(sortedData);

    return sortedData;
  } catch (err) {
    console.log(err);
    newNotification('Failed to fetch diary, please try again!', 'error');
  }
};

const newEntry = async (entryData: DiaryEntry, newNotification: (message: string, style: string) => void) => {
  console.log(entryData);

  try {
    const result = await axios.post(
      'http://localhost:3000/api/diaries',
      entryData
    );

    newNotification('New entry added successfully!', 'success');

    return result;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      let errorMessage;

      if (err.response) {
        errorMessage = err.response.data as string;
      }

      newNotification(`Failed to add new diary entry ${errorMessage}`, 'error');
    } else {
      newNotification('Something went wrong!', 'error');
    }
    return 'error occurred';
  }
};

export default {
  getAll,
  newEntry,
};
