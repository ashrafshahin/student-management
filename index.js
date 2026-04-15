require('dotenv').config();
console.log(`Students ${process.env.STUDENT}`)

const express = require('express')
const app = express()

app.use(express.json())

app.post('/registration', (req, res) => {
    res.send('hello shahin')
})


app.listen(5000, () => {
    console.log('Student Management Server Running...');
    
});