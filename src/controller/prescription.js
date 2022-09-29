import Prescription from '../models/prescription';
import prescriptionService from '../services/prescription.service';
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
			return res.status(200).send({ data: data });
		} catch (error) {
			return res.status(500).send({ error: error.message });
		}

	};
}

export default PrescriptionController;
