interface HealthCheckFormData {
  healthCheckRating: string;
}

interface Props {
  setHealthCheckFormData: React.Dispatch<
    React.SetStateAction<HealthCheckFormData>
  >;
  healthCheckFormData: HealthCheckFormData;
}

const HealthCareEntryForm = ({
  healthCheckFormData,
  setHealthCheckFormData,
}: Props) => {
  const handleHealthCheckChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHealthCheckFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
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
  );
};

export default HealthCareEntryForm;
