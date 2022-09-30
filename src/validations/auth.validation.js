import Joi from 'joi';

const patientRegistrationSchema = Joi.object({
	userName: Joi.string().min(6),
	email: Joi.string().required().email(),
	firstName: Joi.string().required().min(3),
	lastName: Joi.string().required().min(3),
	dob: Joi.string(),
	location: Joi.string(),
	password: Joi.string()
		.required()
		.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#*&]+)[\w@#*&]{8,}$/)
		.messages({
			'string.pattern.base':
				'{{#label}} must contain at least a number, a special character, an upper-case letter and longer than 8 characters',
		}),
});




const hospitalRegistrationSchema = Joi.object({
	userName: Joi.string().min(6),
	hospitalName: Joi.string(),
	email: Joi.string().required().email(),
	location: Joi.string(),
	password: Joi.string()
		.required()
		.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#*&]+)[\w@#*&]{8,}$/)
		.messages({
			'string.pattern.base':
				'{{#label}} must contain at least a number, a special character, an upper-case letter and longer than 8 characters',
		}),
});



const healthPractionalregistrationSchema = Joi.object({
	userName: Joi.string().min(6),
	firstName: Joi.string().required().min(3),
	lastName: Joi.string().required().min(3),
	bio: Joi.string().required(),
	dob: Joi.string(),
	location: Joi.string(),
	specialization: Joi.string().required(),
	email: Joi.string().required().email(),
	profilePicture: Joi.string().required(),
	password: Joi.string()
		.required()
		.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#*&]+)[\w@#*&]{8,}$/)
		.messages({
			'string.pattern.base':
				'{{#label}} must contain at least a number, a special character, an upper-case letter and longer than 8 characters',
		}),
});




const loginSchema = Joi.object({
	email: Joi.string().required().email(),
	password: Joi.string().required(),
})


class authValidation {
	static patientsregistrationValidation = (req, res, next) => {
		const { error } = patientRegistrationSchema.validate(req.body);
		if (error) {
			return res.status(422).json({
				error: error.details[0].message.replace(/["'`]+/g, ''),
			});
		}
		next();
	};

	static hospitalregistrationValidation = (req, res, next) => {
		const { error } = hospitalRegistrationSchema.validate(req.body);
		if (error) {
			return res.status(422).json({
				error: error.details[0].message.replace(/["'`]+/g, ''),
			});
		}
		next();
	};


	static healthPractionalregistrationValidation = (req, res, next) => {
		const { error } = healthPractionalregistrationSchema.validate(req.body);
		if (error) {
			return res.status(422).json({
				error: error.details[0].message.replace(/["'`]+/g, ''),
			});
		}
		next();
	};

	static loginValidation = (req, res, next) => {
		const { error } = loginSchema.validate(req.body);
		if (error) {
			return res.status(422).json({
				error: error.details[0].message.replace(/["'`]+/g, ''),
			});
		}
		next();
	}

}

export default authValidation

