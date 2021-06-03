const express = require('express')
const router = new express.Router;
const Experiment = require("../models/experiment");
const controller = require("../controllers/experimentControllers");
const {
    verifyAccessToken
} = require('../controllers/authContollers');

router.post("/experiment/teacher/create/:token", verifyAccessToken, (req, res) => {

    controller.createExperiment(req, res);

})

router.post("/experiment/teacher/read/:token", verifyAccessToken, (req, res) => {

    controller.viewExperimentsByTeacher(req, res);

})

router.post("/experiment/student/read/:token", verifyAccessToken, (req, res) => {

    controller.viewExperimentsByStudent(req, res);

})

router.post("/experiment/student/start", (req, res) => {

    controller.startExperiment(req, res);

})



module.exports = router;