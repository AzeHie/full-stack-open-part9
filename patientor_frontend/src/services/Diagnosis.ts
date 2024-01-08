import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { Diagnosis } from '../types';

const getAll = async (newNotification: (message: string) => void) => {
  try {
    const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

    return data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      newNotification(`Failed to fetch diagnoses. ${err.response.data}`);
    } else {
      console.error(err);
      newNotification('Failed to fetch diagnoses');
    }
  }
};

export default {
  getAll,
};
