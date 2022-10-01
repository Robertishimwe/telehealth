import { Router } from 'express';
import authorize from '../middleware/authorize'
import verify from '../middleware/verify';

import PrescriptionController from '../controller/prescription'
import MedicalRecords from '../controller/medicalRecord'

const { isAdmin, isHospitalAdmin, isHealthPractional, isPatient } = authorize;

//import routes


const router = Router();

//section routing
router.post('/add',verify,isHealthPractional, PrescriptionController.addPrescription)
router.get('/thisprescription/:prescriptionId', PrescriptionController.getPrescriptionByAppointment)

router.get('/records/:patientId', MedicalRecords.getAllmedicalRecords)

// router.post('/send/forgot-password', validateEmail, sendResetPasswordEmail);   template

export default router; 
