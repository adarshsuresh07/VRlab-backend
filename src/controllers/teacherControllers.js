const express = require("express");
const Teacher = require("../models/teacher");
const jwt_decode=require('jwt-decode')

const readAll =(req,res)=>{

  Teacher.find().then(data=>{
    res.json(data)
  }).catch(err=>{
    res.status(404).json(err)
  })
}

const readOne=(req,res)=>{

  const decoded = jwt_decode (req.params.token)
  Teacher.findById(decoded.id).then(user=>{
    const userData={
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                verified: user.verified,
                experiments_started: user.experiments_started
    }
    res.json(userData)
  })
  .catch(err=>{
    res.status(404).json({
      msg:"User not found",
      error:err
    })
  })
}
  
  module.exports = {
    
    readAll: readAll,
    readOne: readOne
  };