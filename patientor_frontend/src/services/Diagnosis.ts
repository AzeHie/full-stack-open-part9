import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { Diagnosis } from '../types';

const getAll = async (newNotification: (message: string) => void) => {
  try {
    const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

    return data;
  } catch (err) {
    let errorMessage = 'Failed to fetch diagnoses';
    if (err instanceof Error) {
      errorMessage += ` Error: ${err.message}`;
    }
    newNotification(errorMessage);
  }
};

export default {
  getAll,
};
