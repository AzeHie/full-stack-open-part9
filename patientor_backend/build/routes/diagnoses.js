"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoseService_1 = __importDefault(require("../services/diagnoseService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    console.log('Fetching diagnoses');
    const diagnosesData = diagnoseService_1.default.getDiagnoses();
    res.status(200).json(diagnosesData);
});
exports.default = router;
