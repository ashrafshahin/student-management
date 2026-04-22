require('dotenv').config();
console.log(`Students ${process.env.STUDENT}`)
const express = require('express');
const { default: mongoose } = require('mongoose');
const dbConnection = require('./src/config/dbConnection');
const { loginUser, registrationController, logoutUser } = require('./src/controllers/authController');
const { createProfile, getAllProfile, getSingleProfile,  } = require('./src/controllers/studentProfileController');

// basic way to connect database... username-password dete hobe
// mongoose.connect('mongodb+srv://username:password@clustershahin.nicn5ni.mongodb.net/student-management?appName=ClusterShahin').then(() => {
//     console.log('database connected...');
    
// })

const app = express()
dbConnection()

app.use(express.json())

//auth api's
app.post('/registration', registrationController)
app.post('/login', loginUser)
app.post('/logout/:id', logoutUser)

// profile api's
app.post('/createprofile', createProfile)

app.get('/getallprofiles', getAllProfile)
app.get('/getsingleprofile/:id', getSingleProfile)



app.listen(5000, () => {
    console.log('Student Management Server Running...');
    
});