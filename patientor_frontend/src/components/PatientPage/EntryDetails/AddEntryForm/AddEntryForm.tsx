import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useRef,
  useState,
} from 'react';

import patientService from '../../../../services/patients';

import './AddEntryForm.css';
import { EntryFormValues, EntryType } from '../../../../types';
import { NotificationContext } from '../../../../contexts/NotificationContext';

interface Props {
  setShowForm: Dispatch<SetStateAction<boolean>>;
  reFetchPatientData: () => void;
  patientId: string;
}

const AddEntryForm = ({
  setShowForm,
  reFetchPatientData,
  patientId,
}: Props) => {
  const diagnosisCodeRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState({
    date: '',
    type: '' as EntryType,
    specialist: '',
    description: '',
    diagnosisCodes: [] as string[],
  });

  const [hospitalFormData, setHospitalFormData] = useState({
    discharge: {
      date: '',
      criteria: '',
    },
  });

  const [occupationalFormData, setOccupationalFormData] = useState({
    employerName: '',
    sickLeave: {
      startDate: '',
      endDate: '',
    },
  });

  const [healthCheckFormData, setHealthCheckFormData] = useState({
    healthCheckRating: '',
  });

  const { newNotification } = useContext(NotificationContext);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith('discharge-')) {
      const discharge = name.split('-')[1];
      setHospitalFormData((prevFormData) => ({
        ...prevFormData,
        [discharge]: value,
      }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleHospitalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const discharge = name.split('-')[1];
    setHospitalFormData((prevFormData) => ({
      ...prevFormData,
      [discharge]: value,
    }));
  };

  const handleOccupationalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name);

    if (name.startsWith('sickleave-')) {
      // CHATGPT LOOK THIS!!!
      const sickLeaveProperty = name.split('-')[1];
      setOccupationalFormData((prevFormData) => ({
        ...prevFormData,
        sickLeave: {
          ...prevFormData.sickLeave,
          [sickLeaveProperty]: value,
        },
      }));
    } else {
      setOccupationalFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleHealthCheckChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHealthCheckFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const addNewDiagnosisCode = (newDiagnosisCode: HTMLInputElement | null) => {
    if (newDiagnosisCode) {
      const newFormData = {
        ...formData,
        diagnosisCodes: formData.diagnosisCodes.concat(newDiagnosisCode.value),
      };
      setFormData(newFormData);

      newDiagnosisCode.value = '';
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    let entryData;
    switch (formData.type) {
      case 'Hospital':
        entryData = {
          ...formData,
          ...hospitalFormData,
        };
        break;
      case 'OccupationalHealthCare':
        entryData = {
          ...formData,
          ...occupationalFormData,
        };
        console.log(entryData);
        break;
      case 'HealthCheck':
        entryData = {
          ...formData,
          ...healthCheckFormData,
        };
        break;
      default:
        newNotification('Invalid entryData..');
        throw new Error(
          'Invalid entry type, please check your details and try again!'
        );
    }
    const entryFormData: EntryFormValues = entryData;

    const result = await patientService.addNewEntry(
      entryFormData,
      patientId,
      newNotification
    );

    if (result) {
      reFetchPatientData();
      setShowForm(false);
    }
  };

  return (
    <form className='entry-form' onSubmit={handleSubmit}>
      <div>
        <label htmlFor='date'>Date:</label>
        <input
          type='date'
          id='date'
          name='date'
          value={formData.date}
          onChange={handleChange}
        />
        <label htmlFor='type'>Type:</label>
        <select
          id='type'
          name='type'
          value={formData.type}
          onChange={handleChange}
        >
          <option value=''>Select entry type</option>
          <option value='Hospital'>Hospital</option>
          <option value='HealthCheck'>HealthCheck</option>
          <option value='OccupationalHealthCare'>Occupational HeathCare</option>
        </select>
      </div>
      <div>
        <label htmlFor='specialist'>Specialist:</label>
        <input
          type='text'
          id='specialist'
          name='specialist'
          value={formData.specialist}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='description'>Description:</label>
        <input
          type='text'
          id='description'
          name='description'
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='diagnosisCodes'>Diagnosis codes:</label>
        <input
          type='text'
          id='diagnosisCodes'
          name='diagnosisCodes'
          ref={diagnosisCodeRef}
        />
        <button
          type='button'
          onClick={() => addNewDiagnosisCode(diagnosisCodeRef.current)}
        >
          Add diagnosis
        </button>
        {formData.diagnosisCodes.length > 0 && (
          <div>
            <p>
              <b>Added diagnoses:</b>
            </p>
            {formData.diagnosisCodes.map((code) => (
              <p key={code}>{code}</p>
            ))}
          </div>
        )}
      </div>
      {formData.type === 'Hospital' && (
        <div>
          <h4>Discharge:</h4>
          <label htmlFor='discharge-date'>Date:</label>
          <input
            type='date'
            id='discharge-date'
            name='discharge-date'
            value={hospitalFormData.discharge.date}
            onChange={handleHospitalChange}
          />
          <label htmlFor='discharge-criteria'>Criteria:</label>
          <input
            type='text'
            id='discharge-criteria'
            name='discharge-criteria'
            value={hospitalFormData.discharge.criteria}
            onChange={handleHospitalChange}
          />
        </div>
      )}
      {formData.type === 'OccupationalHealthCare' && (
        <div>
          <label htmlFor='employername'>Employer:</label>
          <input
            type='text'
            id='employername'
            name='employerName'
            value={occupationalFormData.employerName}
            onChange={handleOccupationalChange}
          />
          <p>Sick leave (optional):</p>
          <label htmlFor='sickleave-startDate'>Start date:</label>
          <input
            type='date'
            id='sickleave-startDate'
            name='sickleave-startDate'
            value={occupationalFormData.sickLeave.startDate}
            onChange={handleOccupationalChange}
          />
          <label htmlFor='sickleave-endDate'>End date:</label>
          <input
            type='date'
            id='sickleave-endDate'
            name='sickleave-endDate'
            value={occupationalFormData.sickLeave.endDate}
            onChange={handleOccupationalChange}
          />
        </div>
      )}
      {formData.type === 'HealthCheck' && (
        <div>
          <label htmlFor='healthCheckRating'>Health check rating:</label>
          <select
            id='healthCheckRating'
            name='healthCheckRating'
            value={healthCheckFormData.healthCheckRating}
            onChange={handleHealthCheckChange}
          >
            <option value=''>Select health rating</option>
            <option value='Healthy'>Healthy</option>
            <option value='LowRisk'>LowRisk</option>
            <option value='HighRisk'>HighRisk</option>
            <option value='CriticalRisk'>CriticalRisk</option>
          </select>
        </div>
      )}
      <div className='entry-form__submit-buttons'>
        <button>Save</button>
        <button onClick={() => setShowForm(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default AddEntryForm;
