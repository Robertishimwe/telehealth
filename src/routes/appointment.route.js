import { Router } from 'express';
import AppointmentController from '../controller/appointmentBooking'
import appointmentValidation from '../validations/appointment.validation'
import authorize from '../middleware/authorize'
import verify from '../middleware/verify';

const { isAdmin, isHospitalAdmin, isHealthPractional, isPatient } = authorize;
const { appointmentBookingValidation} = appointmentValidation

const router = Router();

router.post('/booking',verify,isPatient,appointmentBookingValidation,AppointmentController.patientsBookingAppointment)

// router.post('/register/healthPractional',verify,isHospitalAdmin, healthPractionalregistrationValidation, AuthController.healthPractictionerRegistration)








export default router;