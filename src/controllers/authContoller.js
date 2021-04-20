const express =require('express')
const bcrypt = require("bcryptjs")
const jwt= require('jsonwebtoken')
const Student=require('../models/student')
const Teacher=require('../models/teacher')
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')



const register =(req,res,next)=>{

    const { errors, isValid } = validateRegisterInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

     bcrypt.hash(req.body.password,10,function(err,hashedPass){
         if(err){
             res.json({
                 error:err
             })
         }

         if(req.body.user==="student"){
             let user=new Student({
                fullname:req.body.fullname,
                email:req.body.email,
                password:hashedPass
                
             })
             user.save()
             .then(user=>{
                 res.json({
                     message: "Student added Successfully"
                 })
             })
             .catch(error=>{
                 res.json({
                     message:"An error occured"
                 })
             })
         }
         if(req.body.user==="teacher"){
            let user=new Teacher({
               fullname:req.body.fullname,
               email:req.body.email,
               password:hashedPass
               
            })
            user.save()
            .then(user=>{
                res.json({
                    message: "Teacher added Successfully"
                })
            })
            .catch(error=>{
                res.json({
                    message:"An error occured"
                })
            })
        }
     })


}

const login=(req,res,next)=>{

    const { errors, isValid } = validateLoginInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }
    const user= req.body.user
    const email=req.body.email
    const password = req.body.password
    
    if(user==="student"){
        Student.findOne({email}).then(user=>{
            if(!user){
                return res.status(404).json({msg:"Email not found"})

            }
            bcrypt.compare(password,user.password).then(isMatch=>{
                if(isMatch){
                    let token =jwt.sign({email:user.email},'verySecretValue',{expiresIn:'1h'})
                    res.json({
                        message:"Login Successfull",
                        token
                    })

                }
                else{
                    res.json({
                        message:"password does not match"
                    })
                }
            })
            

        })
    }
    if(user==="teacher"){
        Teacher.findOne({email}).then(user=>{
            if(!user){
                return res.status(404).json({msg:"Email not found"})

            }
            bcrypt.compare(password,user.password).then(isMatch=>{
                if(isMatch){
                    let token =jwt.sign({email:user.email},'verySecretValue',{expiresIn:'1h'})
                    res.json({
                        message:"Login Successfull",
                        token
                    })

                }
                else{
                    res.json({
                        message:"password does not match"
                    })
                }
            })
            

        })
    }

}
        
module.exports={
    register,
    login
}