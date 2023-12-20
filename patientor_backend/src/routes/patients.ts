import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const NonSensitivePatientDetails = patientService.getNonSensitivePatientDetails();

  res.status(200).json(NonSensitivePatientDetails);
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedPatient = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  });

  res.status(200).json(addedPatient);
})

export default router;