import appointmentService from "../services/appointment.service";
import emailHelper from '../helpers/email';
import emailTemplate from '../helpers/emailTemplate';

const { findAppointments, cancelAppointment } = appointmentService


class cancellingAppointment {
    static cancelAppointmentPatient = async(req,res)=>{
     const appointmentId = req.params.appointmentId
     const oldappointment = await findAppointments({_id: appointmentId, patient: req.user.id })
     if(!oldappointment) return res.status(404).send({message:"appointment you are trying to cancel does not exit"})
     try {
        const cancelledAppointment = await cancelAppointment({_id: appointmentId, patient: req.user.id },{status: "canceled"})
        const emailBody = `This is to inform you that ${cancelledAppointment.patient.firstName} ${cancelledAppointment.patient.firstName} has cancelled his/her meeting with you which was schedured on ${cancelledAppointment.date} at ${cancelledAppointment.time}`
        await emailHelper(cancelledAppointment.healthPractional.email,`${cancelledAppointment.patient.firstName} cancelled appointment - TOAS`, emailTemplate(cancelledAppointment.healthPractional.firstName, emailBody, `${process.env.RIDIRECT}/login`, "View all your appointments"))
        return res.status(200).send({message:'appointment cancelled successful'})
        
     } catch (error) {
        return res.status(500).send({error: error})  
     }
    }
    static cancelAppointmentPractioner = async (req, res) =>{
      const appointmentId = req.params.appointmentId

        try {
            const cancelledAppointment = await cancelAppointment({_id: appointmentId, healthPractional: req.user.id },{status: "canceled"})
            const emailBody = `Due to some unforeseen circumstances,  we are forced to cancel your appointment which was scheduled on ${cancelledAppointment.date} at ${cancelledAppointment.time}. we apologize for the short notice and any inconvenience this may cause.`
            await emailHelper(cancelledAppointment.patient.email,`${cancelledAppointment.healthPractional.firstName} cancelled appointment - TOAS`, emailTemplate(cancelledAppointment.patient.firstName, emailBody, `${process.env.RIDIRECT}/health-practitioner`, "Book another appointment"))
            return res.status(200).send({message:'appointment cancelled successful'})
            
        } catch (error) {
          console.log(">>>>",error)
            return res.status(500).send({error})
            
        }

    }
}

export default cancellingAppointment
