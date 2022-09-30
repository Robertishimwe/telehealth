import Appointment from '../models/appointment';
import userService from '../services/user.service';
import appointmentService from '../services/appointment.service'

const { findAppointments, checkAppointment } = appointmentService


class PatientAppointmentController {

    static ViewPatientAppointments = async (req, res) => {
        const query = { patient: req.user.id };
        try {
            const appointmentList = await findAppointments(query);
            return res.status(200).send({ message: "list of appointments", appointment: appointmentList })
        } catch (error) {
            return res.send(500).send({ error: error })

        }

    }

}

export default PatientAppointmentController
