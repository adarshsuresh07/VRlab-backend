require("../db/db");
const express = require("express");
const router = new express.Router();
const Student = require("../models/student");
const controller = require("../controllers/studentControllers");
const { verifyAccessToken } = require("../controllers/authContoller");

router.get("/student",verifyAccessToken, async (req, res) => {
  controller.readAll(req, res);
});

router.post("/student/:token",verifyAccessToken, (req,res)=>{
  controller.readOne(req,res);
})




module.exports = router;
