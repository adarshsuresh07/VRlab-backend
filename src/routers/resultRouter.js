const express = require('express')
const router = new express.Router;
const Result = require("../models/result");
const controller = require("../controllers/resultControllers");
const {
    verifyAccessToken
} = require('../controllers/authContollers');

router.post("/result/start/:token", verifyAccessToken, (req, res) => {

    controller.start(req, res);

})
router.post("/result/save/:token", verifyAccessToken, (req, res) => {

    controller.save(req, res);

})
router.post("/result/submit/:token", verifyAccessToken, (req, res) => {

    controller.submit(req, res);

})

module.exports = router;