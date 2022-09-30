import { required } from 'joi';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({
	patient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	healthPractional: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	hospital: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	appointment:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Appointment',
		required: true,
	},
	medicationDetails: {
		type: String,
		required: true,
	},
	prescribedMedications: [
		{
			medicationName: {
				type: String,
				required: true,
			},
			purpose: {
				type: String,
				required: true,
			},
			Dosage: {
				type: String,
				required: true,
			},
			frequency: {
				type: String,
				required: true,
			},
		},
	],

	CreatedDate: {
		type: Date,
		default: Date.now(),
	},
});

//medication name, purpose, Dosage, frequency

const Prescription = mongoose.model('Prescription', PrescriptionSchema);

export default Prescription;
