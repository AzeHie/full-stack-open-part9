import axios from 'axios';
import { Entry, EntryFormValues, Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async (newNotification: (message: string) => void) => {
  try {
    const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

    return data;
  } catch (err) {
    let errorMessage = 'Failed to fetch patients!';
    if (err instanceof Error) {
      errorMessage += ` Error: ${err.message}`;
    }
    newNotification(errorMessage);
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
    let errorMessage = 'Failed to fetch patient';
    if (err instanceof Error) {
      errorMessage += ` Error: ${err.message}`;
    }
    newNotification(errorMessage);
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
    let errorMessage = 'Failed to add new entry';
    if (err instanceof Error) {
      errorMessage += ` Error: ${err.message}`;
    }
    newNotification(errorMessage);
  }
};

const addNewEntry = async (
  object: EntryFormValues,
  patientId: string,
  newNotification: (message: string) => void
) => {
  try {
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${patientId}/entries`,
      object
    );

    return data;
  } catch (err) {
    let errorMessage = 'Failed to add new entry';
    if (err instanceof Error) {
      errorMessage += ` Error: ${err.message}`;
    }
    newNotification(errorMessage);
  }
};

export default {
  getAll,
  getPatientById,
  create,
  addNewEntry,
};
