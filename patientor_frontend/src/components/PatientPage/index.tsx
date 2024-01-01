import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Patient } from '../../types';
import { FaGenderless } from 'react-icons/fa';
import { CgGenderFemale } from 'react-icons/cg';
import { CgGenderMale } from 'react-icons/cg';

import patientService from '../../services/patients';

import './index.css';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patientDetails, setPatientDetails] = useState<Patient>();
  const [genderIcon, setGenderIcon] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    const fetchPatientById = async () => {
      if (!id) {
        return <div>Could not fetch patient details with given ID..</div>;
      }

      const patientData = await patientService.getPatientById(id);

      if (patientData.gender === 'other') {
        setGenderIcon(<FaGenderless />);
      } else if (patientData.gender === 'male') {
        setGenderIcon(<CgGenderMale />);
      } else {
        setGenderIcon(<CgGenderFemale />);
      }

      setPatientDetails(patientData);
    };

    fetchPatientById();
  }, [id]);

  if (!patientDetails) {
    return <div>Loading..</div>;
  }

  return (
    <div className='patient-page__container'>
      <h2>
        {patientDetails.name} {genderIcon}
      </h2>
      <p>ssn: {patientDetails.ssn}</p>
      <p>occupation: {patientDetails.occupation}</p>
    </div>
  );
};

export default PatientPage;
