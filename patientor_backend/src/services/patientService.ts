import { v4 as uuidv4 } from 'uuid';

import patientData from '../data/patients';
import { NewPatientEntry, NonSensitivePatientDetails } from '../util/types';
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

export default {
  getNonSensitivePatientDetails,
  getPatientDetails,
  addPatient
};
