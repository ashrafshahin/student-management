const Profile = require('../models/studentSchema');

const createProfile = async (req, res) => {
    const { name, stuRoll, stuClass, parents, gender, bloodGroup, phone, email, dob, paymentDate, results } = req.body;

    try {
        // Student ID banabo...//
        const nameLetters = name.slice(0, 3)
        const dobLetters = dob.slice(0, 3)
        const randomNumber = Math.floor(1000 + Math.random() * 9999);
        const studentId = 'Stu-'+ nameLetters + randomNumber + dobLetters

        // studentId mile gele Error debe...//
        const existingId = await Profile.findOne({ studentId });
        if (existingId) {
           return res.status(409).json({ success: false, message: "Id already used..." })
        };
        // Profile ase kina check hobe...
        const existingProfile = await Profile.findOne({ studentId });
        if (existingProfile) {
           return res.status(409).json({ success: false, message: "Student already Registerred..." })
        }

        const data = await new Profile({
            studentId,
            name,
            stuRoll,
            stuClass,
            parents,
            gender,
            bloodGroup,
            phone,
            email,
            dob,
            paymentDate,
            results,

        }).save()
        try {
            res.status(201).json({ success: true, message: "Student Profile Created..." });
        } catch (error) {
            res.status(400).json({ success: false, message: "Give required Student Information..." });
        }


    } catch (error) {
        return res.status(500).json({ success: false, message: "Server gone mad..." });
      
    }
    console.log(error);
}

const getAllProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Profile.find({ id });
        if (data) {
            res.status(200).json({ success: true, message: "All Students Profiles...", data: data });
        } else {
            res.status(400).json({ success: false, message: "Students Profiles NOT found..." })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server gone mad..." }); 
    }
}

module.exports = {createProfile, getAllProfile, }