import { Diagnosis, HealthCheckEntry } from '../../../types';

import './HealthCheckEntry.css';

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntryComponent = ({ entry, diagnoses }: Props) => {
  return (
    <div className='healthCheckEntry__container'>
        <h4>Specialist: {entry.specialist} ({entry.type})</h4>
      <p>
        {entry.date} {entry.description}
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
  );
};

export default HealthCheckEntryComponent;