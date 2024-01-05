import { v4 as uuidv4 } from 'uuid';
import {
  Diagnosis,
  Entry,
  Gender,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  NewHealthCareEntry,
  NewPatientEntry,
  OccupationalHealthcareEntry,
} from './types';

// type guard, returns type predicate:
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing data');
  }

  return param;
};

// using typescrit enum
const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const isDateOfBirth = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDateOfBirth(date)) {
    throw new Error('Incorrect or missing date of birth: ' + date);
  }

  return date;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: [],
    };

    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing or invalid!');
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> => {
  if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
    // we just trust that values in the array are string
    return [] as Array<Diagnosis['code']>;
  }

  return diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (
  object: unknown
): { date: string; criteria: string } => {
  if (
    !object ||
    typeof object !== 'object' ||
    !('date' in object) ||
    !('criteria' in object)
  ) {
    throw new Error('Incorrect or missing field: discharge');
  }

  if (!isString(object.date) || !isString(object.criteria)) {
    throw new Error(
      'Incorrect or missing fields in discharge: date and/or criteria.'
    );
  }

  return { date: object.date, criteria: object.criteria };
};

const parseSickLeave = (object: unknown): { startDate: string; endDate: string } => {
  console.log(object);
  if (
    !object ||
    typeof object !== 'object' ||
    !('startDate' in object) ||
    !('endDate' in object)
  ) {
    throw new Error('Incorrect or missing field: sickLeave');
  }

  if (!isString(object.startDate) || !isString(object.endDate)) {
    throw new Error(
      'Incorrect or missing field in sickLeave: start and/or end'
    );
  }

  return { startDate: object.startDate, endDate: object.endDate };
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (parseString(rating)) {
    switch (rating) {
      case 'Healthy':
        return HealthCheckRating.Healthy;
      case 'LowRisk':
        return HealthCheckRating.LowRisk;
      case 'HighRisk':
        return HealthCheckRating.HighRisk;
      case 'CriticalRisk':
        return HealthCheckRating.CriticalRisk;
      default:
        throw new Error('Invalid type of HealthCheckRating');
    }
  }

  throw new Error('Invalid or missing field: healthCheckRating');
}

const parseHospitalEntry = (newEntry: NewHealthCareEntry): HospitalEntry => {
  if ('discharge' in newEntry) {
    const newHospitalEntry = {
      ...newEntry,
      id: uuidv4(),
      discharge: parseDischarge(newEntry.discharge),
    };

    return newHospitalEntry;
  } else {
    throw new Error(
      'Incorrect or missing data in the new hospital entry, please try again!'
    );
  }
};

const parseOccupationalHealthCareEntry = (
  newEntry: NewHealthCareEntry
): OccupationalHealthcareEntry => {
  if ('employerName' in newEntry) {
    const newOccupationalEntry = {
      ...newEntry,
      id: uuidv4(),
      employerName: parseString(newEntry.employerName),
    };

    if('sickLeave' in newEntry) {
      const occupationalEntryWithSickLeave = {
        ...newOccupationalEntry,
        sickLeave: parseSickLeave(newEntry.sickLeave)
      };

      return occupationalEntryWithSickLeave;
    }

    return newOccupationalEntry;
  }

  throw new Error(
    'Incorrect or missing data in the new occupational healthcare entry, please try again!'
  );
};

const parseHealthCheckEntry = (newEntry: NewHealthCareEntry): HealthCheckEntry => {
  if ('healthCheckRating' in newEntry) {
    const newHealthCheckEntry = {
      ...newEntry,
      healthCheckRating: parseHealthCheckRating(newEntry.healthCheckRating),
      id: uuidv4()
    }

    return newHealthCheckEntry;
  }

  throw new Error('invalid or missing field in healthCheck entry');
};

export const toNewHealthCareEntry = (object: unknown): Entry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'date' in object &&
    'type' in object &&
    'specialist' in object &&
    'description' in object
  ) {
    let newEntry;

    newEntry = {
      ...object,
      date: parseString(object.date),
      type: parseString(object.type),
      specialist: parseString(object.specialist),
      description: parseString(object.description),      
    };

    if ('diagnosisCodes' in object) {
      newEntry = {
        ...newEntry,
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
      }
    }

    if('type' in object) {
      switch(object.type) {
        case 'hospital':
          return parseHospitalEntry(newEntry);
        case 'occupationalHealthCare':
          return parseOccupationalHealthCareEntry(newEntry);
        case 'healthCheck':
          return parseHealthCheckEntry(newEntry);
        default:
          throw new Error('Bad type of entry, check details and try again!');
      }
    }
  }

  throw new Error('Incorrect or missing data, please try again!');
};
