import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {

  try {
    const NonSensitivePatientDetails =
      patientService.getNonSensitivePatientDetails();
  
    res.status(200).json(NonSensitivePatientDetails);
  } catch (error) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
  }
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  try {
    const addedPatient = patientService.addPatient({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
    });
  
    res.status(200).json(addedPatient);
  } catch (error) {
    let errorMessage = 'Failed to add new patient';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(500).json(errorMessage);
  }
});

export default router;
