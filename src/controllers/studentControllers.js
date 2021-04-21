const Student = require("../models/student");

const readAll =(req,res)=>{

  Student.find().then(data=>{
    res.json(data)
  }).catch(err=>{
    res.status(404).json(err)
  })
}

module.exports = {
  readAll: readAll,
};
