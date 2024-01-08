interface HospitalFormData {
  discharge: {
    date: string;
    criteria: string;
  };
}

interface Props {
  setHospitalFormData: React.Dispatch<React.SetStateAction<HospitalFormData>>;
  hospitalFormData: HospitalFormData;
}

const HospitalEntryForm = ({
  hospitalFormData,
  setHospitalFormData,
}: Props) => {
  const handleHospitalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const discharge = name.split('-')[1];
    setHospitalFormData((prevFormData) => ({
      ...prevFormData,
      discharge: {
        ...prevFormData.discharge,
        [discharge]: value,
      },
    }));
  };

  return (
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
  );
};

export default HospitalEntryForm;
