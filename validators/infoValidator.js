const { check, validationResult } = require("express-validator");
const Info = require("../models/Info");

exports.infoValidationResult = (req, res) => {
  const {
    name,
    email,
    phoneNo,
    dateOfBirth,
    gender,
    education,
    checkBox,
  } = req.body;

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
};

exports.infoValidator = [
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
            reject(new Error("Server Error"));
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
];
