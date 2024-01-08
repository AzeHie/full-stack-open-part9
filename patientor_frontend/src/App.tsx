import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';
import { Diagnosis, Patient } from './types';

import patientService from './services/patients';
import PatientListPage from './components/PatientListPage';
import PatientPage from './components/PatientPage';

import diagnosisService from './services/Diagnosis';
import Notification from './components/Notification';
import { NotificationContext } from './contexts/NotificationContext';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const { newNotification, closeNotification, notificationMessage} = useContext(NotificationContext);
  
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchData = async () => {
        const patients = await patientService.getAll(newNotification);

        if (!patients) {
          return <div>loading..</div>;
        }

        setPatients(patients);

        const diagnoses = await diagnosisService.getAll(newNotification);

        if (!diagnoses) {
          return <div>Failed to fetch diagnoses..</div>;
        }

        setDiagnoses(diagnoses);
    };
    void fetchData();
  }, [newNotification]);


  return (
    <div className='App'>
      <Router>
        <Container>
          <Typography variant='h3' style={{ marginBottom: '0.5em' }}>
            Patientor
          </Typography>
          <Button component={Link} to='/' variant='contained' color='primary'>
            Home
          </Button>
          <Divider hidden />
          <Notification closeNotification={closeNotification} notificationMessage={notificationMessage} />
          <Routes>
            <Route
              path='/'
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route
              path='/api/patients/:id'
              element={<PatientPage diagnoses={diagnoses} />}
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
