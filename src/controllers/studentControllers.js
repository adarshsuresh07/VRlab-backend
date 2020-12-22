// require("../db/db");
const express = require("express");
const Student = require("../models/student");

const addStud = async (req, res) => {
  const stud = new Student(req.body);
  console.log(req.body);
  try {
    await stud.save();
    res.status(201).send(stud);
  } catch (e) {
    res.status(400).send(e);
  }
};

const readAll = async (req, res) => {
  try {
    const stud = await Student.find();
    res.send(stud);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

module.exports = {
  addStud: addStud,
  readAll: readAll,
};
