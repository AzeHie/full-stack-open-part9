export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  date: string;
  type: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis['code']>
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  }
}

export interface HospitalEntry extends BaseEntry {
  discharge: {
    date: string;
    criteria: string;
  }
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry = 
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatientDetails = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
