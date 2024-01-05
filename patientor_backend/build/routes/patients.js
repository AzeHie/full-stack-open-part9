"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../util/utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    try {
        const NonSensitivePatientDetails = patientService_1.default.getNonSensitivePatientDetails();
        res.status(200).json(NonSensitivePatientDetails);
    }
    catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
    }
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = (0, utils_1.default)(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatientEntry);
        res.status(200).json(addedPatient);
    }
    catch (error) {
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
        const patientDetails = patientService_1.default.getPatientDetails(id);
        res.status(200).json(patientDetails);
    }
    catch (err) {
        let errorMessage = 'Something went wrong';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        res.status(500).json(errorMessage);
    }
});
exports.default = router;
