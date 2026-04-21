const mongoose = require('mongoose')
const { Schema } = mongoose

const studentProfileSchema = new Schema({
    studentId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    stuRoll: {
        type: String,
        required: true,
        
    },
    stuClass: {
        type: String,
        required: true,
        enum: ['play', 'nursery', 'cls-1', 'cls-2', 'cls-3', 'cls-4', 'cls-5'],
    },
    parents: {
        type: {
            father: { type: String, required: true },
            mother: { type: String, required: true },
        },
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: ['A+', 'B+', 'AB+', 'O+', 'O-', 'A-', 'B-', 'AB-'],
    },
    phone: {
        type: {
            father: { type: String, required: true },
            mother: { type: String, required: true },
        },
        required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        sparse: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
    results: [{
        subject: {
            type: String,
            trim: true,
            required: true,
        },
        marks: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
    }],
    
});

module.exports = mongoose.model('Profile', studentProfileSchema);
// console.log(studentProfileSchema, "schema chekkkk");
