import Prescription from "../models/prescription";

class prescriptionService {
    static addNewPrescription = async (data) =>{

        const prescription = new Prescription(data);
		const newPrescription = await (await (await (await prescription.save()).populate("patient")).populate("healthPractional")).populate("hospital");

        if(newPrescription) return newPrescription
		
    }
    static findPrescription = async (query) => {
		const prescription = await Prescription.find(query).populate('healthPractional').populate('hospital').populate('patient');
		if (prescription) return prescription;
	}
}

export default prescriptionService
