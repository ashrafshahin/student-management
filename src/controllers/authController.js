const User = require("../models/userSchema");

const createUser = async (req, res) => {
    const { username, email, password } = req.body
    
    const newUser = await new User({
        username,
        email,
        password
    }).save()
    res.send("new user created...")
}

module.exports = {createUser}