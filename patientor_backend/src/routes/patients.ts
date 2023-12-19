import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const NonSensitivePatientDetails = patientService.getNonSensitivePatientDetails();

  res.status(200).json(NonSensitivePatientDetails);
});

export default router;