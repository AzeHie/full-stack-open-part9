export interface Entry {
  id?: string;
  date: string;
  type: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis['code']>
}

export interface HospitalEntry extends Entry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  }
}

export interface OccupationHealthcareEntry extends Entry {
  type: "OccupationalHealthCare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  }
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends Entry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Array<HospitalEntry | OccupationHealthcareEntry | HealthCheckEntry>;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;