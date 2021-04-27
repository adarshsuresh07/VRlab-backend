const jwt = require('jsonwebtoken')
const jwt_decode = require("jwt-decode")
const Student = require('../models/student')
const Teacher = require('../models/teacher')
const Experiment = require('../models/experiment')
const Result = require('../models/result')
const random = require('random-key-generator')



const start = (req, res) => {

    const decoded = jwt_decode(req.params.token)
    Experiment.findOne({
        key: req.body.key
    }).then(data => {
        if (!data) {
            return res.json({
                msg: "Invalid key"
            })
        }
        Result.findOne({
            $and: [{
                    'key': req.body.key
                },
                {
                    'done_by': decoded.email
                }
            ]

        }).then(data => {
            if (!data) {

                let result = new Result({
                    key: req.body.key,
                    done_by: decoded.email

                })

                result.save().then(result => {

                    res.json({
                        result,
                        msg: "New Result field addded using given data"
                    })


                }).catch(err => {
                    res.json({
                        msg: "couldnt store data in database",
                        err
                    })
                })

            }

            const resultData = {
                key: data.key,
                result: data.result,
                mark: data.mark,
                submitted: data.submitted,
                done_by: data.done_by,
                created_at: data.created_at,
                updated_at: data.updated_at
            }
            res.json(resultData)


        }).catch(err => {
            err
        })


    }).catch(err => {
        return res.json({
            Error: err
        })
    })
}



const save = (req, res) => {


    const decoded = jwt_decode(req.params.token)

    Result.findOneAndUpdate({
        $and: [{
                'key': req.body.key
            },
            {
                'done_by': decoded.email
            }
        ]
    }, {
        result: req.body.result,
        updated_at: Date.now()
    }, {
        new: true
    }).then(updated => {
        res.json({
            msg: 'updated successfully',
            updated_to: updated
        })
    }).catch(err => {
        err
    })



}

const submit = (req, res) => {



    const decoded = jwt_decode(req.params.token)

    Result.findOneAndUpdate({
        $and: [{
                'key': req.body.key
            },
            {
                'done_by': decoded.email
            }, {
                'submitted': false
            }
        ]
    }, {
        result: req.body.result,
        updated_at: Date.now(),
        submitted: true,
        mark: "pending"
    }, {
        new: true
    }).then(submitted => {
        if (!submitted) {
            res.json({
                msg: 'Already submitted'
            })
        }
        res.json({
            msg: 'submitted successfully',
            submitted_value: submitted
        })
    }).catch(err => {
        err
    })

}

module.exports = {
    start: start,
    save: save,
    submit: submit
}