require("../db/db");
const express = require("express");
const router = new express.Router();
const Student = require("../models/student");
const controller = require("../controllers/studentControllers");

router.get("/student", async (req, res) => {
  controller.readAll(req, res);
});

router.post("/student", async (req, res) => {
  controller.addStud(req, res);
});


module.exports = router;
