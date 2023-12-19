import patientData from '../data/patients';
import { NonSensitivePatientDetails } from '../util/types';

const getNonSensitivePatientDetails = (): NonSensitivePatientDetails[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getNonSensitivePatientDetails,
};
