import { Router } from 'express';
import auth from './auth';
import users from './user.route'
import appointment from './appointment.route';
import Prescription from './prescription.route';

// import  apiDocumentation  from '../docs/apidoc';

//import routes


const router = Router();

//section routing

router.use('/auth', auth)
router.use('/appointment', appointment)
router.use('/users', users)
router.use('/prescription', Prescription)
// router.use('/trip', multiCity); template

export default router;
