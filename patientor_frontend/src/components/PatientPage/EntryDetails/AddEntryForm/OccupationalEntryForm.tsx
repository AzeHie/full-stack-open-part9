interface OccupationalFormData {
  employerName: string;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
}

interface Props {
  setOccupationalFormData: React.Dispatch<
    React.SetStateAction<OccupationalFormData>
  >;
  occupationalFormData: OccupationalFormData;
}

const OccupationalEntryForm = ({
  occupationalFormData,
  setOccupationalFormData,
}: Props) => {
  const handleOccupationalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name);

    if (name.startsWith('sickleave-')) {
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

  return (
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
  );
};

export default OccupationalEntryForm;
