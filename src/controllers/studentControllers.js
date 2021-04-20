const Student = require("../models/student");
// const readAll = async (req, res) => {
//   try {
//     const stud = await Student.find();
//     res.send(stud);
//   } catch (e) {
//     console.log(e);
//     res.status(500).send();
//   }
// };

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
