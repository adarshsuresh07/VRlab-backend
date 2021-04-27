const jwt = require('jsonwebtoken')
const jwt_decode = require("jwt-decode")
const Student = require('../models/student')
const Teacher = require('../models/teacher')
const Experiment = require('../models/experiment')
const random = require('random-key-generator')

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

            err
        })

    }).catch(err => {
        res.json(err)
    })




}

const viewExperiments = (req, res) => {

    const decoded = jwt_decode(req.params.token)

    Experiment.find().then(data => {
        const new_data = data.filter(item => item.created_by == decoded.email)
        res.json(new_data)
    }).catch(err => {
        res.status(404).json(err)
    })
}




module.exports = {
    createExperiment: createExperiment,
    viewExperiments: viewExperiments
}