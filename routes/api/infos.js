const express = require('express');
const router = express.Router();

const Info = require('../../models/Info');

router.get('/', (req, res) => {
    Info.find()
        .then(infos => res.json(infos));
});

router.post('/', (req, res) => {
    const { name, email, phoneNo, dateOfBirth, gender, education, checkBox } = req.body;

    // if (!name || !email || !phoneNo || !dateOfBirth || !gender || !education) {
    //     return res.status(400).json({ msg: 'Please enter all fields' });
    // }

    Info.findOne({ email })
        .then(info => {
            if (info)
                return res.status(400).json({ msg: 'Email already exists' });

            const newInfo = new Info({
                name,
                email,
                phoneNo,
                dateOfBirth,
                gender,
                education,
                checkBox
            })

            newInfo.save().then(info => res.json(info));

            return res.status(200).json({ msg: 'Success' });
        });
});

module.exports = router;