import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    patient: {
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

    discriptionOfsickness: {
        type: String
    },

    date: {
        type: String // "date": "2021-04-19",
    },
    time: {
        type: String // "time":"10:00-11:00",
    },

    conferanceLink:{
        type: String
    },

    status: {
        type: String,
        enum: ['done', 'didNotAttend', 'canceled', 'notYetStarted'],
        default: 'notYetStarted'
    },

    CreatedDate: {
        type: Date,
        default: Date.now(),
    },
});


const Appointment = mongoose.model('Appointment', AppointmentSchema);

export default Appointment;
