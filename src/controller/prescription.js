import Prescription from "../models/prescription";


class PrescriptionController {

    static addPrescription = async(req, res) => {

    const healthPractional = req.user.id
    const hospital = healthPractional.workPlace
    
    const {patient, medicationDetails, prescribedMedications} = req.body
    const qq = {hospital,patient,healthPractional,medicationDetails, prescribedMedications};



    const newPrescription = new Prescription(qq)

    const data = await newPrescription.save()
    console.log(data)
    console.log({"medication detail":medicationDetails, "prescribedMedications":prescribedMedications})


    }
}

export default PrescriptionController