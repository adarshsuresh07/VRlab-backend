const Student = require("../models/student");
const jwt_decode = require("jwt-decode")
const Validator = require('validator')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const readAll = (req, res) => {

  Student.find().then(data => {
    res.json(data)
  }).catch(err => {
    res.status(404).json(err)
  })
}

const readOne = (req, res) => {

  const decoded = jwt_decode(req.params.token)
  Student.findById(decoded.id).then(user => {
      const userData = {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        verified: user.verified,
        experiments_done: user.experiments_done
      }
      res.json(userData)
    })
    .catch(err => {
      res.status(404).json({
        msg: "User not found",
        error: err
      })
    })
}

const resetPasswordStudent = (req, res) => {
  const data = req.body;
  const decoded = jwt_decode(req.params.token)

  Student.findById(decoded.id).then(user => {
    if (Validator.isEmpty(data.password)) {
      return res.status(400).json({
        msg: "Password field is required"
      })
    }
    if (Validator.isEmpty(data.password2)) {
      return res.status(400).json({
        msg: "Confirm password field is required"
      })
    }
    if (!Validator.isLength(data.password, {
        min: 6,
        max: 30
      })) {
      return res.status(400).json({
        msg: "Password must be at least 6 characters"
      })
    }
    if (!Validator.equals(data.password, data.password2)) {
      return res.status(400).json({
        msg: "Passwords must match"
      })
    }

    //Hash password

    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
      if (err) {
        res.stjson({
          error: err
        })
      }

      var new_password = hashedPass

      user.update({
        password: new_password
      }).then(data => {
        res.json({
          msg: "Password reset successfull",
          user: user.fullname
        })
      }).catch(err => {
        res.status(404).json({
          msg: "User doesn't exist",
          err
        })
      })
    })


  })


}

module.exports = {
  readAll: readAll,
  readOne: readOne,
  resetPasswordStudent: resetPasswordStudent
};