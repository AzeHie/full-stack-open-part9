import express from 'express';
import DiagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    const diagnosesData = DiagnoseService.getDiagnoses();
  
    res.status(200).json(diagnosesData);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).json(errorMessage);
  }
})

export default router;