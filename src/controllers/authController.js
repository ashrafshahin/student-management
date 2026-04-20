const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");


const registrationController = async (req, res) => {
    const { username, email, password } = req.body
    try {
        // email ta used kina dekbo...
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            res.status(409).json({ success: false, message: "Email already exists..." })
        }

        // password rejex before bcrypt..//
        const passwordRejex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;
        if (!passwordRejex.test(password)) {
            return res.status(400).json({ success: false, message: "Please enter a stronger password..." });
        }

        // password bcrypt korbo
        const hashPassword = bcrypt.hashSync(password, 10);
        console.log(hashPassword, "hash chack...");

        const createUser = await new User({
            username: username,
            email: email,
            password: hashPassword
        }).save()
        try {
            res.status(201).json({
                success: true,
                message: "new user created...",
                id: createUser._id,
                username: createUser.username,
                email: createUser.email,
                password: hashPassword

            })
        } catch (error) {
            res.status(500).json({ success: false, message: "Failed to Create New User..." });
        }
        console.log(createUser);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Gone mad..." });
    }
    
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        // dekbo email registration kora ase ki naa..//
        if (!existingUser) {
           return res.status(404).json({ success: false, message: "Email not found, Please Register..." })
        };
        
        // akta device e login thakte parbe..//
        if (existingUser.isLogin) {
            return res.status(400).json({
                success: false,
                message: "Please logOut from another device...",
            })
        };
        
    
        // hash compare kore login...
        const pass = bcrypt.compareSync(password, existingUser.password);
        // onno device login na thakle //
        existingUser.isLogin = true;
        existingUser.save();
        if (pass) {
            res.status(200).json({
                success: true,
                message: "Loging successful..."
            });
            console.log("Login successful");
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid Credential..."
            })
            console.log("Wrong password");
        };

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Gone mad..." });
    }
    
};

const logoutUser = async (req, res) => {
    const { id } = req.params;
    try {
        const existingUser = await User.findById(id);
        existingUser.isLogin = false;
        existingUser.save(); // database e save hobe..
        res.status(200).json({
            success: true,
            message: "Log Out Successully..."
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Gone mad..." });
    }
};

module.exports = { registrationController, loginUser, logoutUser,}