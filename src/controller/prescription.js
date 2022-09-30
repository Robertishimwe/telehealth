import Prescription from '../models/prescription';
import prescriptionService from '../services/prescription.service';
import emailTemplate from '../helpers/emailTemplate';
import emailHelper from '../helpers/email';
import userService from '../services/user.service';

const { addNewPrescription, findPrescription } = prescriptionService;
const { findUser, checkUser } = userService;

class PrescriptionController {
	static addPrescription = async (req, res) => {
		const healthPractional = req.user.id;
		const query = { _id: healthPractional };
		const {
			workPlace: { _id },
		} = await checkUser(query);

		const { patient, medicationDetails, prescribedMedications,appointment } = req.body;
		const wholePrescription = {
			hospital: _id,
			patient,
			appointment,
			healthPractional,
			medicationDetails,
			prescribedMedications,
		};

		try {
			const data = await addNewPrescription(wholePrescription);
			const emailBody = `Your prescription from ${data.healthPractional.firstName} ${data.healthPractional.lastName} - ${data.hospital.hospitalName} is ready. you can order medication from pharmacy near you or request online delivery at: www.dotpharma.rw`
			const prescriptionLink = `${process.env.RIDIRECT}/prescription/${appointment}`
			await emailHelper(data.patient.email,`Prescription - ${data.hospital.hospitalName}`, emailTemplate(`${data.patient.firstName} ${data.patient.lastName}`, emailBody, prescriptionLink, "View prescription"))
			return res.status(200).send({ data: data });
		} catch (error) {
			console.log(error)
			return res.status(500).send({ error: error.message });
		}

	};

	static getPrescriptionByAppointment = async (req, res) => {
		const query = { appointment: req.params.prescriptionId }
		try {
			const thisPrescription = await findPrescription(query)
		   return res.status(200).send({"prescription": thisPrescription})
		} catch (error) {
           return res.status(500).send({"error": error})
		}

	}
}

export default PrescriptionController;
