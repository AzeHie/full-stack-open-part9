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
        <b>Specialist:</b> {entry.specialist}
      </p>
      <p>
        <b>Employer name:</b> {entry.employerName}
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      {entry.sickLeave && (
        <p>
          <b>Sick leave:</b>
          <ul>
            <li>Start: {entry.sickLeave.startDate}</li>
            <li>End: {entry.sickLeave.endDate}</li>
          </ul>
        </p>
      )}
        <p><b>Diagnoses:</b></p>
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
  );
};

export default OccupationalHealthcareEntryComponent;
