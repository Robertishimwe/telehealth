import { Router } from 'express';
import AppointmentController from '../controller/appointmentBooking'
import appointmentValidation from '../validations/appointment.validation'
import AdimnAppointmentController from '../controller/adminAppointment';
import PatientAppointmentController from '../controller/patientsAppointment'
import PractitionerAppointmentController from '../controller/practitionersAppointment'
import HealthCenterAdimnAppointmentController from '../controller/healthAdminAppointment';
import authorize from '../middleware/authorize'
import verify from '../middleware/verify';

const { isAdmin, isHospitalAdmin, isHealthPractional, isPatient } = authorize;
const { appointmentBookingValidation} = appointmentValidation

const router = Router();

router.post('/booking',verify,isPatient,appointmentBookingValidation,AppointmentController.patientsBookingAppointment)
router.get('/admin/my-appointments',verify,isAdmin,AdimnAppointmentController.ViewPractitionersAppointments)
router.get('/patient/my-appointments',verify,isPatient,PatientAppointmentController.ViewPatientAppointments)
router.get('/practioner/my-appointments',verify,isHealthPractional,PractitionerAppointmentController.ViewPractitionersAppointments)
router.get('/health-center/my-appointments',verify,isHospitalAdmin,HealthCenterAdimnAppointmentController.ViewPractitionersAppointments)


// router.post('/register/healthPractional',verify,isHospitalAdmin, healthPractionalregistrationValidation, AuthController.healthPractictionerRegistration)








export default router;