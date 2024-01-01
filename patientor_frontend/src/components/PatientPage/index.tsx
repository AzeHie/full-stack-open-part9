import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';
import { Patient } from '../../types';

const PatientPage = () => {
  const { id } = useParams<{ id: string  }>();
  const [patientDetails, setPatientDetails] = useState<Patient>();

  useEffect(() => {
    const fetchPatientById = async () => {

      if (!id) {
        return <div>Could not fetch patient details with given ID..</div>;
      }

      const patientData = await patientService.getPatientById(id);

      setPatientDetails(patientData);
    };

    fetchPatientById();
  }, [id]);

  if (!patientDetails) {
    return <div>Loading..</div>;
  }

  console.log(patientDetails);

  return <div>{patientDetails.name}</div>;
};

export default PatientPage;
