import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Diagnosis, Patient } from '../../types';
import { FaGenderless } from 'react-icons/fa';
import { CgGenderFemale } from 'react-icons/cg';
import { CgGenderMale } from 'react-icons/cg';

import patientService from '../../services/patients';
import EntryDetails from './EntryDetails/index';

import './index.css';
import AddEntryForm from './EntryDetails/AddEntryForm/AddEntryForm';
import { NotificationContext } from '../../contexts/NotificationContext';

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const { id } = useParams<{ id: string }>();
  const [patientDetails, setPatientDetails] = useState<Patient>();
  const [genderIcon, setGenderIcon] = useState<React.ReactElement | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  const { newNotification } = useContext(NotificationContext);

  useEffect(() => {
    const fetchPatientById = async () => {
      if (!id) {
        return <div>Could not fetch patient details with given ID..</div>;
      }

      try {
        const patientData = await patientService.getPatientById(id, newNotification);

        if(!patientData) {
          return <div>Error! Failed to fetch patient details!</div>;
        }

        if (patientData.gender === 'other') {
          setGenderIcon(<FaGenderless />);
        } else if (patientData.gender === 'male') {
          setGenderIcon(<CgGenderMale />);
        } else {
          setGenderIcon(<CgGenderFemale />);
        }
  
        setPatientDetails(patientData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPatientById();
  }, [id, newNotification]);

  if (!id || !patientDetails) {
    return <div>Loading or error..</div>;
  }

  const reFetchPatientData = async () => {
    try {
      const patientData = await patientService.getPatientById(id, newNotification);
      setPatientDetails(patientData);
    } catch (err) {
      console.log('something went wrong');
    }
  };

  return (
    <div className='patient-page__container'>
      <h2>
        {patientDetails.name} {genderIcon}
      </h2>
      <p>ssn: {patientDetails.ssn}</p>
      <p>occupation: {patientDetails.occupation}</p>
      <div>
        {!showForm && <button onClick={() => setShowForm(true)}>Add new entry</button>}
        {showForm && <AddEntryForm setShowForm={setShowForm} reFetchPatientData={reFetchPatientData} patientId={id} />}
      </div>
        {patientDetails.entries.length > 0 && (
          <div>
            <h3>entries</h3>
            <EntryDetails
              entries={patientDetails.entries}
              diagnoses={diagnoses}
            />
          </div>
        )}
    </div>
  );
};

export default PatientPage;
