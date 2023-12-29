import axios from 'axios';
import { DiaryEntry } from '../utils/Types';

const getAll = async () => {
  try {
    const result = await axios.get<DiaryEntry[]>(
      `http://localhost:3000/api/diaries`
    );

    const sortedData = result.data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return sortedData;
  } catch (err) {
    console.log(err);
    throw new Error('Something went wrong!');
  }
};

const newEntry = async (entryData: DiaryEntry) => {
  console.log(entryData);

  try {
    const result = await axios.post(
      'http://localhost:3000/api/diaries',
      entryData
    );

    return result;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      let errorMessage;

      if (err.response) {
        errorMessage = err.response.data as string;
      }

      throw new Error(`Failed to add new diary entry. ${errorMessage}`);
    } else {
      throw new Error('Something went wrong!');
    }
  }
};

export default {
  getAll,
  newEntry,
};
