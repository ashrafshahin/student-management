require('dotenv').config();
console.log(`Students ${process.env.STUDENT}`)
const express = require('express');
const { default: mongoose } = require('mongoose');
const dbConnection = require('./src/config/dbConnection');

// basic way to connect database... username-password dete hobe
// mongoose.connect('mongodb+srv://username:password@clustershahin.nicn5ni.mongodb.net/student-management?appName=ClusterShahin').then(() => {
//     console.log('database connected...');
    
// })

const app = express()
dbConnection()

app.use(express.json())

app.post('/registration', (req, res) => {
    res.send('hello shahin')
})


app.listen(5000, () => {
    console.log('Student Management Server Running...');
    
});