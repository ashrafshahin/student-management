const User = require("../models/userSchema");

const createUser = async (req, res) => {
    const { username, email, password } = req.body
    
    const data = await new User({
        username,
        email,
        password
    }).save()
    res.status(201).json({ data: data, success: true, message: "new user created..." })
    console.log(newUser);
    
};

const loginUser = async (req, res) => {
    const { email, password } = req.body
    const data = await User.findOne({ email });
    if (loginUser) {
        res.status(200).json({ data: data, success: true, message: "login done..." })
    } else {
        res.status(400).json({ success: false, message: "User not found..." })
    }
};

module.exports = {createUser, loginUser}