import Appointment from '../models/appointment';

class appointmentService {

	static checkAppointment = async (query) => {
		const appointment = await Appointment.findOne(query);
		if (appointment) return appointment;
	}
	static findAppointments = async (query) => {
		const appointment = await Appointment.find(query).populate('healthPractional').populate('hospital').populate('patient');
		if (appointment) return appointment;
	}
	static updateAppointment = async (prevAppointment, updatedAppointment) => {
		Object.assign(prevAppointment, updatedAppointment);
		return await prevAppointment.save();
	}
	static cancelAppointment = async(query, update) => {
		const appointment = await Appointment.findOneAndUpdate(query, update, { new: true }).populate('healthPractional').populate('hospital').populate('patient');
		if (appointment) return appointment;

	}
}

export default appointmentService;
