import { Router } from 'express';
import UsersController from '../controller/users';
import authorize from '../middleware/authorize'
import verify from '../middleware/verify';

const { isAdmin, isHospitalAdmin, isHealthPractional, isPatient } = authorize;

const router = Router();

router.get('/patients', UsersController.getAllPatients)
router.get('/hospitals', UsersController.getAllHospital)
router.get('/healthPractitioners', UsersController.getAllHealthPractitioner)
router.get('/allusers', UsersController.getAllusers)
router.get('/patient/byEmail/:email', UsersController.getSinglePatientByEmail)
router.get('/patient/byId/:id', UsersController.getSinglePatientById)

// router.post('/register/healthPractional',verify,isHospitalAdmin, healthPractionalregistrationValidation, AuthController.healthPractictionerRegistration)


export default router;
