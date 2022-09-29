import Prescription from "../models/prescription";

class prescriptionService {
    static addNewPrescription = async (data) =>{

        const prescription = new Prescription(data);
		const newPrescription = await prescription.save();

        if(newPrescription) return newPrescription
		
    }
}

export default prescriptionService
