import Appointment from '../models/appointment';
import emailHelper from '../helpers/email';
import emailTemplate from '../helpers/emailTemplate';
import userService from '../services/user.service';
import { v4 as uuidv4 } from 'uuid';


const { checkUser, updateUser } = userService;

class AppointmentController {
    static patientsBookingAppointment = async(req, res)=> {

        const { healthPractional, discriptionOfsickness, date, time} = req.body;
        const room = uuidv4();
        const hospital = await checkUser({ _id: req.body.healthPractional})
        const appointment = {
            patient: req.user.id,
            conferanceLink:`${process.env.RIDIRECT}/room/${room}`,
            hospital:hospital.workPlace, 
            healthPractional, 
            discriptionOfsickness, 
            date, 
            time
        }
       const newAppointment = new Appointment(appointment)

       try {
        const data = await newAppointment.save()
        console.log(data)
       } catch (error) {
        console.log(error)
        return error
       }
      
    }
}

export default AppointmentController