import { Router } from 'express';
import AuthController from '../controller/Auth'
import authValidation from '../validations/auth.validation'
import ForgotPasswordController from '../controller/forgotPassword';
import authorize from '../middleware/authorize'
import verify from '../middleware/verify';
const { isAdmin, isHospitalAdmin, isHealthPractional, isPatient } = authorize;

const { patientsregistrationValidation, hospitalregistrationValidation, healthPractionalregistrationValidation, loginValidation } = authValidation;
//import routes


const router = Router();

//section routing
router.post('/register/patient', patientsregistrationValidation, AuthController.patientRegistration)
router.post('/register/hospital', hospitalregistrationValidation, AuthController.hospitalAdminRegistration)
router.post('/register/healthPractional',verify,isHospitalAdmin, healthPractionalregistrationValidation, AuthController.healthPractictionerRegistration)
router.post('/login', loginValidation, AuthController.login)
router.post('/forgot-password',ForgotPasswordController.forgotPasswordHandler)
router.patch('/reset-password/:userId/:token',ForgotPasswordController.resetPasswordHandler)       


// router.post('/send/forgot-password', validateEmail, sendResetPasswordEmail);   template

export default router; 
