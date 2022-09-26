import appointmentService from '../services/appointment.service'

const { findAppointments, checkAppointment } = appointmentService


class PractitionerAppointmentController {

    static ViewPractitionersAppointments = async (req, res) => {
        const query = { healthPractional: req.user.id };
        try {
            const appointmentList = await findAppointments(query);
            console.log(appointmentList)
            return res.status(200).send({ message: "list of appointments", appointment: appointmentList })
        } catch (error) {
            return res.send(500).send({ error: error })

        }

    }

}

export default PractitionerAppointmentController
