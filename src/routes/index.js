import { Router } from 'express';
import auth from './auth';
import users from './user.route'
import appointment from './appointment.route';

// import  apiDocumentation  from '../docs/apidoc';

//import routes


const router = Router();

//section routing

router.use('/auth', auth)
router.use('/appointment', appointment)
router.use('/users', users)
// router.use('/trip', multiCity); template

export default router;
