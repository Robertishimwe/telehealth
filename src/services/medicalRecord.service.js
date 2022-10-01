import prescriptionService from "./prescription.service";

const { findPrescription } = prescriptionService;

class MedicalRecordService {
	static ViewMedicalRecord = async (query) => {
		const records = await findPrescription(query);
		if (records) return records;
	};
}
export default MedicalRecordService;
