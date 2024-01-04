import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Diagnosis, Patient } from '../../types';
import { FaGenderless } from 'react-icons/fa';
import { CgGenderFemale } from 'react-icons/cg';
import { CgGenderMale } from 'react-icons/cg';

import patientService from '../../services/patients';

import './index.css';

interface PatientPageProps {
  diagnoses: Diagnosis[]
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
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
      <div>
        <h3>entries</h3>
        {patientDetails.entries.map((e) => (
          <div key={e.id}>
            <p>
              {e.date} {e.description}
            </p>
            <ul>
              {e.diagnosisCodes?.map((code) => (
                <li key={code}>
                  {code}{' '}
                  {diagnoses.find((d) => d.code === code)?.name || 'Diagnosis is undefined'}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientPage;
