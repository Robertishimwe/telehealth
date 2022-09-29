import Prescription from "../models/prescription";

class prescriptionService {
    static addNewPrescription = async (data) =>{

        const prescription = new Prescription(data);
		const newPrescription = await (await (await (await prescription.save()).populate("patient")).populate("healthPractional")).populate("hospital");

        if(newPrescription) return newPrescription
		
    }
}

export default prescriptionService
