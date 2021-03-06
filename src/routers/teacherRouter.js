require("../db/db");
const express = require("express");
const router = new express.Router();
const Teacher = require("../models/teacher");
const controller = require("../controllers/teacherControllers");
const {
  verifyAccessToken
} = require("../controllers/authContollers");

router.get("/teacher", verifyAccessToken, async (req, res) => {
  controller.readAll(req, res);
});
router.post("/teacher/:token", verifyAccessToken, (req, res) => {
  controller.readOne(req, res);
})

router.post("/teacher/resetpassword/:token", verifyAccessToken, (req, res) => {
  controller.resetPasswordTeacher(req, res);
})

module.exports = router;