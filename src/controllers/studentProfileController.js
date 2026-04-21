const Profile = require('../models/studentSchema');

const createProfile = async (req, res) => {
    const { studentId, name, stuRoll, stuClass, parents, gender, bloodGroup, phone, email, dob, paymentDate, results } = req.body;

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

    res.send("profile created...")

    
}

module.exports = {createProfile, }