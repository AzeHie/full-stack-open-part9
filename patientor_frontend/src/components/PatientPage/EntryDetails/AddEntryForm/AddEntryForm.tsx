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
import HealthCareEntryForm from './HealthCareEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import OccupationalEntryForm from './OccupationalEntryForm';

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
        <HospitalEntryForm
          hospitalFormData={hospitalFormData}
          setHospitalFormData={setHospitalFormData}
        />
      )}
      {formData.type === 'OccupationalHealthCare' && (
        <OccupationalEntryForm
          occupationalFormData={occupationalFormData}
          setOccupationalFormData={setOccupationalFormData}
        />
      )}
      {formData.type === 'HealthCheck' && (
        <HealthCareEntryForm
          healthCheckFormData={healthCheckFormData}
          setHealthCheckFormData={setHealthCheckFormData}
        />
      )}
      <div className='entry-form__submit-buttons'>
        <button>Save</button>
        <button onClick={() => setShowForm(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default AddEntryForm;
