const express=require('express')
const router=new express.Router;
const Experiment=require("../models/experiment");
const controller=require("../controllers/experimentControllers");
const { verifyAccessToken } = require('../controllers/authContollers');

router.post("/experiment/create/:token",verifyAccessToken,(req,res)=>{

    controller.createExperiment(req,res);

})

router.post("/experiment/read/:token",verifyAccessToken,(req,res)=>{

    controller.viewExperiments(req,res);

})


module.exports = router;