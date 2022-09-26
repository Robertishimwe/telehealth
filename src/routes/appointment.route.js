import { Router } from 'express';
import AppointmentController from '../controller/appointmentBooking'
import appointmentValidation from '../validations/appointment.validation'
import PatientAppointmentController from '../controller/patientsAppointment'
import PractitionerAppointmentController from '../controller/practitionersAppointment'
import authorize from '../middleware/authorize'
import verify from '../middleware/verify';

const { isAdmin, isHospitalAdmin, isHealthPractional, isPatient } = authorize;
const { appointmentBookingValidation} = appointmentValidation

const router = Router();

router.post('/booking',verify,isPatient,appointmentBookingValidation,AppointmentController.patientsBookingAppointment)
router.get('/patient/my-appointments',verify,isPatient,PatientAppointmentController.ViewPatientAppointments)
router.get('/practioner/my-appointments',verify,isHealthPractional,PractitionerAppointmentController.ViewPractitionersAppointments)

// router.post('/register/healthPractional',verify,isHospitalAdmin, healthPractionalregistrationValidation, AuthController.healthPractictionerRegistration)








export default router;