import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	userName: {
		type: String,
		max: 30,
		min: 3,
	},
	firstName : {
		type: String,
		max: 30,
		min: 3,
	},
	lastName: {
		type: String,
		max: 30,
		min: 3,
	},
	hospitalName:{
		type: String,
	},
	workPlace:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	specialization:{
		type: String,
	},
	dob:{
        type: String,
    },
	location: {
		type: String,
		min: 3,
		max: 30,
	},
	email: {
		type: String,
		max: 30,
		min: 3,
		required: true,
	},
	password: {
		type: String,
		max: 12,
		min: 6,
		required: true,
	},
    profilePicture:{
        type: String
    },
	isApproved: {
		type: Boolean,
		enum: [true, false],
		required: true,
		default: false,
	},
	Role: {
		type: String,
		enum: ['admin', 'hospitalAdmin', 'healthPractitioner', 'patient'],
		required: true,
	},
	CreatedDate: {
		type: Date,
		default: Date.now(),
	},
});

const User = mongoose.model('User', UserSchema);

export default User;
