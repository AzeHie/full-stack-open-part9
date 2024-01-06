import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useRef,
  useState,
} from 'react';

import patientService from '../../services/patients';

import './AddEntryForm.css';
import { EntryFormValues } from '../../types';

interface Props {
  setShowForm: Dispatch<SetStateAction<boolean>>;
  reFetchPatientData: () => void;
  patientId: string;
}

// SUPPORTS ONLY HOSPITAL ENTRIES FOR NOW!!!

const AddEntryForm = ({ setShowForm, reFetchPatientData, patientId }: Props) => {
  const diagnosisCodeRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    date: '',
    type: '',
    specialist: '',
    description: '',
    diagnosisCodes: [] as string[],
    discharge: {
      date: '',
      criteria: '',
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith('discharge-')) {
      const dischargeProperty = name.split('-')[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        discharge: { ...prevFormData.discharge, [dischargeProperty]: value },
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

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (formData.type === 'Hospital' || formData.type === 'OccupationalHealthCare' || formData.type === 'HealthCheck') {
      const entryData = formData as EntryFormValues;

      try {
        patientService.addNewEntry(entryData, patientId);
  
        reFetchPatientData();
        setShowForm(false);
      } catch (err) {
        console.log('something went wrong!');
      }
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
        <select // how to set default value empty
          id='type'
          name='type'
          value={formData.type}
          onChange={handleChange}
        >
          <option value=''>Select entry type</option>
          <option value='Hospital'>Hospital</option>
          <option value='HealthCheck'>HealthCheck</option>
          <option value='OccupationalHealthcare'>Occupational HeathCare</option>
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
        <button onClick={() => addNewDiagnosisCode(diagnosisCodeRef.current)}>
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
      <div>
        <h4>Discharge:</h4>
        <label htmlFor='discharge-date'>Date:</label>
        <input
          type='date'
          id='discharge-date'
          name='discharge-date'
          value={formData.discharge.date}
          onChange={handleChange}
        />
        <label htmlFor='discharge-criteria'>Criteria:</label>
        <input
          type='text'
          id='discharge-criteria'
          name='discharge-criteria'
          value={formData.discharge.criteria}
          onChange={handleChange}
        />
      </div>
      <div className='entry-form__submit-buttons'>
        <button>Save</button>
        <button onClick={() => setShowForm(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default AddEntryForm;
