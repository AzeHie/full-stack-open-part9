import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../util/utils';

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
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedPatient = patientService.addPatient(newPatientEntry);
  
    res.status(200).json(addedPatient);
  } catch (error) {
    let errorMessage = 'Failed to add new patient';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(500).json(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  try {
    const patientDetails = patientService.getPatientDetails(id);

    console.log(patientDetails);
    res.status(200).json(patientDetails);
  } catch (err) {
    let errorMessage = 'Something went wrong';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    res.status(500).json(errorMessage);
  }
});

export default router;
