const jwt = require('jsonwebtoken')
const jwt_decode = require("jwt-decode")
const Student = require('../models/student')
const Teacher = require('../models/teacher')
const Experiment = require('../models/experiment')
const random = require('random-key-generator')
const Result = require('../models/result')
const e = require('express')
const {
    response
} = require('express')

const createExperiment = (req, res) => {
    const decoded = jwt_decode(req.params.token)
    const key = random.getRandom(6, 'key', '-', 'front');
    let experiment = new Experiment({
        key: key,
        created_by: req.body.email,
        type: req.body.type
    })

    experiment.save().then(data => {

        Teacher.findByIdAndUpdate(decoded.id, {
            $push: {
                experiments_started: data._id
            }
        }, {
            safe: true,
            upsert: true
        }).then(updated => {
            res.json({
                key: data.key,
                msg: "updated experiments_started in teacher schema"

            })
        }).catch(err => {

            res.status(400).json({
                err
            })
        })

    }).catch(err => {
        res.status(400).json(err)
    })




}

const startExperiment = (req, res) => {

    const decoded = jwt_decode(req.params.token)

    Experiment.findOne({
        key: req.body.key
    }).then(data => {



        res.json({
            type: data.type
        })
    }).catch(err => {
        res.status(400).json({
            msg: "Invalid key",
            err
        })
    })
}



const viewExperimentsByTeacher = (req, res) => {

    const decoded = jwt_decode(req.params.token)

    Experiment.find({
        created_by: decoded.email
    }).then(data => {
        let exp_data = {}
        var key_array = data.map(item => item.key)


        key_array.forEach((item, index) => {
            let temp = []
            Result.find({
                key: item
            }).then(data => {
                data.forEach(value => {
                    temp.push(value)
                })
                exp_data[item] = temp

                if (index === key_array.length - 1) {
                    res.json({
                        exp_data

                    })
                }


            }).catch(err => {
                res.status(400).json({
                    err
                })
            })


        })



    }).catch(err => {
        res.status(400).json({
            err
        })
    })
    // let exp_data = {}
    // const Exp = Experiment.find({
    //     created_by: decoded.key
    // })
    // Promise.all(Exp).then(exp => {
    //     let key_array = exp.map(item => item.key).catch(err => {
    //         err
    //     })

    //     key_array.forEach(item => {


    //         let result = Result.find({
    //             key: item
    //         })
    //         Promise.all(result).then(data => {
    //             let temp = []
    //             data.forEach(it => {
    //                 temp.push(it)
    //             })
    //             exp_data[item] = temp

    //         }).catch(err => {
    //             err
    //         })

    //     });
    // }).finally(item => {
    //     console.log(exp_data)
    // })










    // Experiment.find({
    //     created_by: decoded.email
    // }).then(data => {

    //     var key_array = data.map(item => item.key)
    //     console.log(key_array)
    //     Result.find().then(result => {

    //         let exp_data = result.filter(item => key_array.includes(item.key))
    //         let temp = []
    //         let v = 3
    //         key_array.forEach(key => {
    //             exp_data.forEach(exp => {
    //                 if (exp.key == key) {
    //                     temp.push(exp)
    //                     v = 5
    //                 }
    //             })

    //         })
    //         console.log(v)
    //         res.json({
    //             exp_data
    //         })
    //     }).catch(err => {
    //         res.status(400).json({
    //             err
    //         })
    //     })
    // }).catch(err => {
    //     res.status(400).json({
    //         msg: "last"
    //     })
    // })






}

const viewExperimentsByStudent = (req, res) => {

    const decoded = jwt_decode(req.params.token)

    Result.find({
        done_by: decoded.email
    }).then(data => {

        res.json(data)
    }).catch(err => {
        res.status(400).json({
            err
        })
    })



}








module.exports = {
    createExperiment: createExperiment,
    viewExperimentsByTeacher: viewExperimentsByTeacher,
    viewExperimentsByStudent: viewExperimentsByStudent,
    startExperiment: startExperiment

}