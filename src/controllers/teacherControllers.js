const express = require("express");
const Teacher = require("../models/teacher");

const readAll =(req,res)=>{

  Teacher.find().then(data=>{
    res.json(data)
  }).catch(err=>{
    res.status(404).json(err)
  })
}
  
  module.exports = {
    
    readAll: readAll,
  };