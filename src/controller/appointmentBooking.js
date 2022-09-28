import Appointment from '../models/appointment';
import emailHelper from '../helpers/email';
import emailTemplate from '../helpers/emailTemplate';
import userService from '../services/user.service';
import messages from '../messages/messages';
import { v4 as uuidv4 } from 'uuid';


const { checkUser, updateUser } = userService;

class AppointmentController {
    static patientsBookingAppointment = async (req, res) => {

        const { healthPractional, discriptionOfsickness, date, time } = req.body;
        const room = uuidv4();
        const conferanceLink = `${process.env.RIDIRECT}/room/${room}`;
        const hospital = await checkUser({ _id: req.body.healthPractional })
    
        const appointment = {
            patient: req.user.id,
            hospital: hospital.workPlace,
            conferanceLink,
            healthPractional,
            discriptionOfsickness,
            date,
            time
        }
        const newAppointment = new Appointment(appointment)

        try {
            const data = await newAppointment.save()
            ///send email after booking appointment
            const emailBody =`Thank you for booking an appointment with ${hospital.firstName} ${hospital.lastName} which will take place on ${date} at ${time}. If you are unable to make your appointment, please contact us as soon as possible.`
            await emailHelper(req.user.email, messages.emailSubject, emailTemplate(req.user.firstname, emailBody, conferanceLink, "Join a meeting"));
            ///
            res.status(201).send({ message: "appointment booked successful" });
        } catch (error) {
            res.status(500).send({ error: error });
        }

    }
}

export default AppointmentController