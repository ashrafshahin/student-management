const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");


const registrationController = async (req, res) => {
    const { username, email, password } = req.body
    
    // email ta used kina dekbo...
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        res.status(409).json({success:false, message: "Email already exists..."})
    }
    // password bcrypt korbo
    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword, "hash chack...");
    
    const createUser = await new User({
        username: username,
        email: email,
        password: hashPassword
    }).save()
    res.status(201).json({
        success: true,
        message: "new user created...",
        id: createUser._id,
        username: createUser.username,
        email: createUser.email,
        password: hashPassword
        
     })
    console.log(createUser);
    
};

const loginUser = async (req, res) => {
    const { email, password } = req.body
    const data = await User.findOne({ email });
    // hash compare kore login...
    const pass = bcrypt.compareSync(password, data.password);
    if (pass) {
        console.log("Login successful");
    } else {
        console.log("Wrong password");
    }
    

    
    if (loginUser) {
        res.status(200).json({ success: true, message: "login done..." })
    } else {
        res.status(400).json({ success: false, message: "User not found..." })
    }
};

module.exports = { registrationController, loginUser}