import Appointment from '../models/appointment';

class appointmentService {
	// static createUser = async (data) => {
	// 	const user = new User(data);
	// 	try {
	// 		await user.save();
	// 		return user;
	// 	} catch (error) {
	// 		throw new Error(error);
	// 	}
	// };

	static checkAppointment = async (query) => {
		const appointment = await Appointment.findOne(query);
		if (appointment) return appointment;
	}
	static updateAppointment = async (prevAppointment, updatedAppointment) => {
		Object.assign(prevAppointment, updatedAppointment);
		return await prevAppointment.save();
	}
}

export default appointmentService;
