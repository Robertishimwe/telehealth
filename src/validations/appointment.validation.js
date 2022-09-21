import Joi from 'joi';
import isBeforeToday from '../helpers/dateValidator';
import isSlotAvailable from '../helpers/isSlotAvailable';


const appointmentBookingSchema = Joi.object({

    healthPractional: Joi.string().required(),
    discriptionOfsickness: Joi.string().min(6).required(),
    date: Joi.string()
        .min(6)
        .required()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .messages({
            'string.pattern.base':
                '{{#label}} date format is not correct'
        }),
    time: Joi.string()
        .min(6)
        .required()
        .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .messages({
            'string.pattern.base':
                '{{#label}} time format is not correct'
        }),
});



class appointmentValidation {
    static appointmentBookingValidation = async (req, res, next) => {
        const {healthPractional, discriptionOfsickness, date, time} = req.body
        const { error } = appointmentBookingSchema.validate(req.body);
        if (error) {
            return res.status(422).json({
                error: error.details[0].message.replace(/["'`]+/g, ''),
            });
        }
        if(isBeforeToday(req.body.date)){
            return res.status(422).json({error:'appointment date must not be back dated'})
        }
        const isSlotFree = await isSlotAvailable(healthPractional,date,time)
        if(!isSlotFree) return res.status(422).json({error:'slot already booked'})
        next();
    }
}

export default appointmentValidation