require("../db/db");
const express = require("express");
const router = new express.Router();
const Teacher = require("../models/teacher");
const controller = require("../controllers/teacherControllers");

router.get("/teacher", async (req, res) => {
  controller.readAll(req, res);
});




module.exports = router;
