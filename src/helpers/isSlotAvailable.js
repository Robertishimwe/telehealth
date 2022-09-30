import appointmentService from "../services/appointment.service";

const { checkAppointment } = appointmentService;

const isSlotAvailable = async (healthPractional, date, time) => {
    const query = { healthPractional, date, time }
    const slot = await checkAppointment(query)
    try {

        if (slot) return false
        if (!slot) return true

    } catch (error) {
        return error
    }


}

export default isSlotAvailable;