import express from 'express';
import DiagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnosesData = DiagnoseService.getDiagnoses();

  res.status(200).json(diagnosesData);
})

export default router;