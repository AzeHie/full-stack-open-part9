import { Dispatch, SetStateAction, SyntheticEvent, useRef, useState } from 'react';

interface Props {
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

// SUPPORTS ONLY HOSPITAL ENTRIES FOR NOW!!!

const AddEntryForm = ({ setShowForm }: Props) => {
  const diagnosisCodeRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    date: '',
    type: '',
    specialist: '',
    description: '',
    diagnosisCodes: [] as string[],
    discharge: {
      date: '',
      criteria: ''
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const addNewDiagnosisCode = (newDiagnosisCode: HTMLInputElement | null) => {
    if (newDiagnosisCode) {
      const newFormData = {
        ...formData,
        diagnosisCodes: formData.diagnosisCodes.concat(newDiagnosisCode.value)
      };
      setFormData(newFormData);
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='date'>Date:</label>
        <input type='date' id='date' name='date' value={formData.date} onChange={handleChange}/>
      <label htmlFor='type'>Type:</label>
        <select
        id='type'
        name='type'
        value={formData.type}
        onChange={handleChange}>
          <option value='Hospital'>Hospital</option>
          <option value='HealthCheck'>HealthCheck</option>
          <option value='OccupationalHealthcare'>Occupational HeathCare</option>
        </select>
        <label htmlFor='specialist'>Specialist:</label>
        <input 
        type='text'
        id='specialist'
        name='specialist'
        value={formData.specialist}
        onChange={handleChange}
        />
        <label htmlFor='description'>Description:</label>
        <input 
        type='text'
        id='description'
        name='description'
        value={formData.description}
        onChange={handleChange}
        />
        <label htmlFor='diagnosisCodes'>Diagnosis codes:</label>
        <input 
        type='text'
        id='diagnosisCodes'
        name='diagnosisCodes'
        ref={diagnosisCodeRef}
        />
        <button onClick={() => addNewDiagnosisCode(diagnosisCodeRef.current)}>Add</button>
    <div>
      <button>Save</button>
      <button onClick={() => setShowForm(false)}>Cancel</button>
    </div>
      </form>
  );
};

export default AddEntryForm;
