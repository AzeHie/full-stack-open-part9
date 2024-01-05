import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Diagnosis, HospitalEntry } from '../../../types';

import './HospitalEntry.css';

interface HospitalEntryProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntryComponent = ({ entry, diagnoses }: HospitalEntryProps) => {
  return (
    <div className='hospitalEntry__container'>
      <p>
        {entry.date}
        <LocalHospitalIcon />
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <p>
        <b>Date of discharge:</b> {entry.discharge.date} -{' '}
        {entry.discharge.criteria}
      </p>
      {entry.diagnosisCodes && (
        <div>
          <h4>Diagnoses:</h4>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code}{' '}
                {diagnoses.find((d) => d.code === code)?.name ||
                  'Diagnosis is undefined'}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p>
        <b>
          <i>Diagnose by {entry.specialist}</i>
        </b>
      </p>
    </div>
  );
};

export default HospitalEntryComponent;
