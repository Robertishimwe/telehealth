import MedicalRecordService from "../services/medicalRecord.service";


const {ViewMedicalRecord} = MedicalRecordService

class MedicalRecords{

    static getAllmedicalRecords = async (req, res) =>{
        const { patientId } = req.params
        const query = {patient: patientId}
        try {
            const allRecords = await ViewMedicalRecord(query)
            console.log(allRecords)
            return res.status(200).send({records: allRecords})
            
        } catch (error) {
            return res.status(500).send({error: error})
        }
    }

}

export default MedicalRecords