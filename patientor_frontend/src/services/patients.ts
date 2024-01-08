import axios from 'axios';
import { Entry, EntryFormValues, Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async (newNotification: (message: string) => void) => {
  try {
    const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

    return data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      newNotification(`Failed to add new entry. ${err.response.data}`);
    } else {
      console.error(err);
      newNotification('Failed to fetch patients!');
    }
  }
};

const getPatientById = async (
  id: string,
  newNotification: (message: string) => void
) => {
  try {
    const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

    return data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      newNotification(`Failed to fetch patient by given id. ${err.response.data}`);
    } else {
      console.error(err);
      newNotification('Failed to fetch patient by given id.');
    }
  }
};

const create = async (
  object: PatientFormValues,
  newNotification: (message: string) => void
) => {
  try {
    const { data } = await axios.post<Patient>(
      `${apiBaseUrl}/patients`,
      object
    );

    return data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      newNotification(`Failed to add new patient. ${err.response.data}`);
    } else {
      newNotification('Failed to add new patient');
    }
  }
};

const addNewEntry = async (
  object: EntryFormValues,
  patientId: string,
  newNotification: (message: string) => void
) => {
  try {
    console.log('object ', object);
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${patientId}/entries`,
      object
    );

    return data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      newNotification(`Failed to add new entry. ${err.response.data}`);
    } else {
      newNotification('Failed to add new entry');
    }
  }
};

export default {
  getAll,
  getPatientById,
  create,
  addNewEntry,
};
