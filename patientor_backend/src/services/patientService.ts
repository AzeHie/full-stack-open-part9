import { v4 as uuidv4 } from 'uuid';

import patientData from '../data/patients';
import { Entry, NewPatientEntry, NonSensitivePatientDetails } from '../util/types';
import patients from '../data/patients';

const getNonSensitivePatientDetails = (): NonSensitivePatientDetails[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientDetails = (id: string) => {
  const patientDetails = patientData.filter((p) => id === p.id);

  return patientDetails[0];
}

const addPatient = ( entry: NewPatientEntry ) : NonSensitivePatientDetails => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);

  return {
    id: newPatientEntry.id,
    name: newPatientEntry.name,
    dateOfBirth: newPatientEntry.dateOfBirth,
    gender: newPatientEntry.gender,
    occupation: newPatientEntry.occupation
  };
};

const addHealthCareEntry = (newEntryData: Entry, patientId: string): Entry => {
  const patient = patientData.find((patient) => patient.id === patientId);

  if(!patient) {
    throw new Error('Patient not found with given ID');
  }

  const newEntry = {
    ...newEntryData
  };

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getNonSensitivePatientDetails,
  getPatientDetails,
  addPatient,
  addHealthCareEntry
};
