import Prescription from '../models/prescription';
import prescriptionService from '../services/prescription.service';
import PrescriptionTemplate from '../helpers/prescriptionTemplate'
import emailHelper from '../helpers/email';
import userService from '../services/user.service';

const { addNewPrescription } = prescriptionService;
const { findUser, checkUser } = userService;

class PrescriptionController {
	static addPrescription = async (req, res) => {
		const healthPractional = req.user.id;
		const query = { _id: healthPractional };
		const {
			workPlace: { _id },
		} = await checkUser(query);

		const { patient, medicationDetails, prescribedMedications } = req.body;
		const wholePrescription = {
			hospital: _id,
			patient,
			healthPractional,
			medicationDetails,
			prescribedMedications,
		};

		try {
			const data = await addNewPrescription(wholePrescription);
			await emailHelper(data.patient.email,`Prescription - ${data.hospital.hospitalName}`, PrescriptionTemplate(`${data.patient.firstName} ${data.patient.lastName}`,data.patient.email,`${data.healthPractional.firstName} ${data.healthPractional.lastName}`,data.hospital.hospitalName,data?.hospital.email,data?.prescribedMedications[0]?.medicationName,data?.prescribedMedications[0]?.purpose,data?.prescribedMedications[0]?.Dosage,data?.prescribedMedications[0]?.frequency,data?.prescribedMedications[1]?.medicationName,data?.prescribedMedications[1]?.purpose,data?.prescribedMedications[1]?.Dosage,data?.prescribedMedications[1]?.frequency,data?.prescribedMedications[2]?.medicationName,data?.prescribedMedications[2]?.purpose,data?.prescribedMedications[2]?.Dosage,data?.prescribedMedications[2]?.frequency))
			return res.status(200).send({ data: data });
		} catch (error) {
			return res.status(500).send({ error: error.message });
		}

	};
}

export default PrescriptionController;
