import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MedicalRecordSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	healthPractional: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	hospital: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},

    diseases: {
        type: String
    },

	prescription: {
		type: String
	},
	
	comment: {
		type: String,
	},
   
	CreatedDate: {
		type: Date,
		default: Date.now(),
	},
});


const Profile = mongoose.model('Profile', MedicalRecordSchema);

export default MedicalRecord;
