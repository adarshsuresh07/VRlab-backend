const express = require('express')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')
const Student = require('../models/student')
const Teacher = require('../models/teacher')
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')
const createError = require('http-errors');
const keys = require("../config/keys")
const {
    default: jwtDecode
} = require('jwt-decode')



const register = (req, res, next) => {

    const {
        errors,
        isValid
    } = validateRegisterInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }

    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }


        if (req.body.user === "student") {
            const email = req.body.email
            Student.findOne({
                email
            }).then(data => {
                if (data) {
                    return res.status(400).json({
                        msg: "Email already exist"
                    })
                }
                Teacher.findOne({
                    email
                }).then(data => {
                    if (data) {
                        return res.status(400).json({
                            msg: "Email already exist"
                        })
                    }
                }).catch(err => {
                    err
                })


                let user = new Student({
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password: hashedPass

                })
                user.save()
                    .then(user => {
                        res.json({
                            message: "Student added Successfully"
                        })
                    })
                    .catch(error => {
                        res.status(400).json({
                            message: "An error occured"
                        })
                    })
            }).catch(err => {
                err
            })
        }
        if (req.body.user === "teacher") {
            const email = req.body.email
            Teacher.findOne({
                email
            }).then(data => {
                if (data) {
                    return res.status(400).json({
                        msg: "Email already exist"
                    })
                }
                Student.findOne({
                    email
                }).then(data => {
                    if (data) {
                        return res.status(400).json({
                            msg: "Email already exist"
                        })
                    }
                }).catch(err => {
                    err
                })

                let user = new Teacher({
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password: hashedPass

                })
                user.save()
                    .then(user => {
                        res.json({
                            message: "Teacher added Successfully"
                        })
                    })
                    .catch(error => {
                        res.status(400).json({
                            message: "An error occured"
                        })
                    })
            })
        }
    })


}

const login = (req, res, next) => {

    const {
        errors,
        isValid
    } = validateLoginInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const user = req.body.user
    const email = req.body.email
    const password = req.body.password

    if (user === "student") {
        Student.findOne({
            email
        }).then(user => {
            if (!user) {
                return res.status(404).json({
                    msg: "Email not found"
                })

            }
            bcrypt.compare(password, user.password).then(isMatch => {

                const payload = {
                    id: user.id,
                    email: user.email
                }
                if (isMatch) {
                    let token = jwt.sign(payload, keys.secretOrKey, {
                        expiresIn: '10d'
                    })
                    res.json({
                        message: "Login Successfull",
                        token
                    })

                } else {
                    res.status(400).json({
                        message: "password does not match"
                    })
                }
            })


        })
    }
    if (user === "teacher") {
        Teacher.findOne({
            email
        }).then(user => {
            if (!user) {
                return res.status(404).json({
                    msg: "Email not found"
                })

            }
            bcrypt.compare(password, user.password).then(isMatch => {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                if (isMatch) {

                    let token = jwt.sign(payload, keys.secretOrKey, {
                        expiresIn: '10d'
                    })
                    res.json({
                        message: "Login Successfull",
                        token
                    })

                } else {
                    res.status(400).json({
                        message: "Incorrect Password"
                    })
                }
            })


        })
    }

}





const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized())

    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(" ")
    const token = bearerToken[1]
    jwt.verify(token, keys.secretOrKey, (err, payload) => {
        if (err) {
            return next(createError.Unauthorized())
        }

        req.payload = payload
        next()
    })
}



module.exports = {
    register,
    login,
    verifyAccessToken,

}