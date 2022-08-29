const constants = require('../constants/messages')
const Career_Obj = require('../Models/careerObjective')
const mongoose = require('mongoose');



exports.getCareerObj = async (req, res) => {
    const careerObj = await Career_Obj.find();
    console.log(careerObj)
    try {
        if (careerObj) {

            return res.status(200).send({
                status: true,
                message: constants.RETRIEVE_SUCCESS,

                careerObj
            })
        }
        else {
            return res.status(404).send({
                status: false,
                message: constants.NOT_FOUND
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: false,
            message: constants.SOMETHING_WENT_WRONG,
        })
    }
}
exports.createCareerObj = async (req, res) => {
    if (!req.body.careerObjective) {
        return res.status(300).send({
            status: false,
            message: constants.REQUIREDFIELDS
        })
    }
    try {
        const CareerObjective = new Career_Obj({
            _id: new mongoose.Types.ObjectId,
            careerObjective: req.body.careerObjective,
        })
        console.log(CareerObjective)
        CareerObjective.save()
            .then(result => {
                console.log(`Career-Obj is added successfully:::${CareerObjective}`)
                return res.status(201).send({
                    status: true,
                    message: constants.CREATE_CAREER_OBJ,
                    New_Objective: result
                })
            }).catch(err => {
                console.log(err)
                return res.status(303).send(500).send({
                    status: false,
                    message: constants.NOT_CREATE_CAREEROBJ
                })
            })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: false,
            message: constants.ERROR_CAREER_OBJ,
            err: error.message
        })
    }

}
exports.updateCareerObj = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(500).send({
                status: false,
                message: constants.REQUIREDFIELDS
            })
        }
        else {
            // const id = req.params.id
            const id = "62b829cfc9e0d0602addd2b6";
            console.log(id)
            Career_Obj.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
                .then(data => {
                    if (!data) {
                        return res.status(404).send({
                            status: false,
                            message: constants.NO_RECORD_FOUND,

                        })
                    }
                    else {
                        return res.status(201).send({
                            status: true,
                            message: constants.UPDATE_SUCCESS,
                            data: data
                        })
                    }
                }).catch(err => {
                    console.log(`Error is Calling from promise ${err}`)
                    res.status(500).send({
                        status: false,
                        message: constants.SERVER_ERROR,

                    })
                })

        }
    } catch (error) {
        console.log("Error From try-catch Block")
        return res.status(500).send({
            status: false,
            message: constants.SERVER_ERROR,
            err: error.message
        })
    }
}

exports.getCareerObjById = async (req, res) => {
    const id = req.params.id;
    Career_Obj.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    status: false,
                    message: constants.NOT_FOUND
                });
            else res.status(200).send({
                status: true,
                message: constants.RETRIEVE_SUCCESS,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                status: false,
                message: constants.RETRIEVE_NOT_SUCCESS
            });
        });
}
exports.deleteCareerObj = async (req, res) => {
    const id = req.params.id;
    Career_Obj.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    status: false,
                    message: constants.NOT_FOUND
                });
            } else {
                res.send({
                    status: true,
                    message: constants.DELETED_SUCCESS
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: false,
                message: constants.COULD_NOT_DELETED
            });
        });
}