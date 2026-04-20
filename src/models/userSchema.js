const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
       
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        // password rejex registrationController - authController-e bcrypt er age korbo
        // match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/, 'Please enter a stronger password...'],
    },
    isLogin: {
        type: Boolean,
        default: false,
    }
    

})

module.exports = mongoose.model('User', userSchema); 
// console.log(Schema, "schema chekkkk");