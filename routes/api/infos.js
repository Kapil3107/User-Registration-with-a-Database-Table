const express = require("express");
const router = express.Router();

const Info = require("../../models/Info");

//const { check, validationResult } = require("express-validator");
const {
  infoValidator,
  infoValidationResult,
} = require("../../validators/infoValidator");

router.get("/", (req, res) => {
  Info.find().then((infos) => res.json(infos));
});

router.post("/", infoValidator, infoValidationResult);

module.exports = router;
