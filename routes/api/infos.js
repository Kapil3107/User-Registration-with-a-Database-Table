const express = require("express");
const router = express.Router();

const Info = require("../../models/Info");

//const infoValidator = require("../../validators/infoValidator");
const { check, validationResult } = require("express-validator");

router.get("/", (req, res) => {
  Info.find().then((infos) => res.json(infos));
});

router.post(
  "/",
  [
    check("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Name is required!")
      .isLength({ min: 3 })
      .withMessage("Name must contain at least three characters"),
    check("email")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Email is required!")
      .isEmail()
      .withMessage("Please enter a valid email address!")
      .custom((value, { req }) => {
        return new Promise((resolve, reject) => {
          Info.findOne({ email: req.body.email }, function (err, info) {
            if (err) {
              reject(new Error("Server Error, Please try again!"));
            }
            if (Boolean(info)) {
              reject(new Error("Email already exists!"));
            }
            resolve(true);
          });
        });
      }),
    check("phoneNo")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Phone number is required!"),
    check("dateOfBirth")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Date of Birth is required!"),
    check("gender")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please select your gender!"),
    check("education")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Education is required!"),
  ],
  (req, res) => {
    const {
      name,
      email,
      phoneNo,
      dateOfBirth,
      gender,
      education,
      checkBox,
    } = req.body;

    // if (!name || !email || !phoneNo || !dateOfBirth || !gender || !education) {
    //     return res.status(400).json({ msg: 'Please enter all fields' });
    // }

    //   Info.findOne({ email }).then((info) => {
    //     if (info) return res.status(400).json({ msg: "Email already exists" });

    const validationErrors = validationResult(req);
    let errorMsg = [];
    if (!validationErrors.isEmpty()) {
      Object.keys(validationErrors.mapped()).forEach((field) => {
        errorMsg.push(validationErrors.mapped()[field]["msg"]);
      });
    }

    if (errorMsg.length) {
      return res.status(400).json(errorMsg);
    } else {
      const newInfo = new Info({
        name,
        email,
        phoneNo,
        dateOfBirth,
        gender,
        education,
        checkBox,
      });

      newInfo.save().then((info) => res.json(info));

      return res.status(200).json({ msg: "Success" });
    }
  }
);

module.exports = router;
