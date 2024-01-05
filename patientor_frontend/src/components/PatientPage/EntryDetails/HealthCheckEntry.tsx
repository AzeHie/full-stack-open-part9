import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Diagnosis, HealthCheckEntry } from '../../../types';

import './HealthCheckEntry.css';

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntryComponent = ({ entry, diagnoses }: Props) => {
  const healthRate = entry.healthCheckRating;

  let healthRateStyle;

  if (healthRate === 3) {
    healthRateStyle = { color: 'red' };
  } else if (healthRate === 2) {
    healthRateStyle = { color: 'orange' };
  } else if (healthRate === 1) {
    healthRateStyle = { color: 'yellow' };
  } else {
    healthRateStyle = { color: 'green' };
  }

  return (
    <div className='healthCheckEntry__container'>
      <p>
        {entry.date} <MonitorHeartIcon style={{ color: 'darkgreen' }} />
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <FavoriteIcon style={healthRateStyle} />
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
        <b>Specialist:</b> <i>{entry.specialist} </i>
      </p>
    </div>
  );
};

export default HealthCheckEntryComponent;
