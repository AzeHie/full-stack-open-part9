import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import { Diagnosis, OccupationHealthcareEntry } from '../../../types';

import './OccupationalHealthcare.css';

interface Props {
  entry: OccupationHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryComponent = ({ entry, diagnoses }: Props) => {
  return (
    <div className='occupationalHealthcare__container'>
      <p>
        {entry.date} <HealthAndSafetyOutlinedIcon />
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <p>
        <b>Employer name:</b> {entry.employerName}
      </p>
      {entry.sickLeave && (
        <div>
          <b>Sick leave:</b>
          <ul>
            <li>Start: {entry.sickLeave.startDate}</li>
            <li>End: {entry.sickLeave.endDate}</li>
          </ul>
        </div>
      )}
      {entry.diagnosisCodes && (
        <div>
          <p>
            <b>Diagnoses:</b>
          </p>
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
        <b>Specialist:</b> {entry.specialist}
      </p>
    </div>
  );
};

export default OccupationalHealthcareEntryComponent;
