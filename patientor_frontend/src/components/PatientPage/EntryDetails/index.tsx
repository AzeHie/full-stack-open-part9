import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationHealthcareEntry,
} from '../../../types';

import HospitalEntryComponent from './HospitalEntry';
import OccupationalHealthcareEntryComponent from './OccupationalHealthcareEntry';
import HealthCheckEntryComponent from './HealthCheckEntry';

interface EntryDetailsProps {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(`Unknown type detected: ${JSON.stringify(value)}`);
};

const EntryDetails = ({ entries, diagnoses }: EntryDetailsProps) => {
  return (
    <div>
      {entries.map((entry) => {
        switch (entry.type) {
          case 'Hospital':
            return (
              <HospitalEntryComponent
                key={entry.id}
                entry={entry as HospitalEntry}
                diagnoses={diagnoses}
              />
            );
          case 'OccupationalHealthcare':
            return (
              <OccupationalHealthcareEntryComponent
                key={entry.id}
                entry={entry as OccupationHealthcareEntry}
                diagnoses={diagnoses}
              />
            );
          case 'HealthCheck':
            return (
              <HealthCheckEntryComponent
                key={entry.id}
                entry={entry as HealthCheckEntry}
                diagnoses={diagnoses}
              />
            );
          default:
            return assertNever(entry as never);
        }
      })}
    </div>
  );
};

export default EntryDetails;
