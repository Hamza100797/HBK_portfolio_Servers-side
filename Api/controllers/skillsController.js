const constants = require('../constants/messages');
const Skill = require('../Models/addSkills');
const mongoose = require('mongoose')
exports.getAll = async (req, res) => {
    try {
        const totalRecord = await Skill.countDocuments({ isDeleted: false });
        const records = await Skill.find({ isDeleted: false })
            .then((data) => {
                return res.status(200).send({
                    status: true,
                    message: constants.RECORD_FOUND,
                    records: data,
                    totalRecord
                })
            })
            .catch((err) => {
                return res.status(404).send({
                    status: false,
                    message: constants.NO_RECORD_FOUND,
                    totalRecord
                })
            })
    } catch (error) {
        return res.status(505).send({
            status: false,
            message: error.message
        })
    }
}
exports.getById = async (req, res) => {
    const id = req.params.id;
    Skill.findById(id)
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
exports.createNew = async (req, res) => {
    if (
        !req.body.skillTitle ||
        !req.body.skillValue ||
        !req.body.skillCategory

    ) {
        return res.status(300).send({
            status: false,
            message: constants.REQUIREDFIELDS,
        });
    }
    try {
        const newSkill = new Skill({
            _id: new mongoose.Types.ObjectId,
            skillTitle: req.body.skillTitle,
            skillValue: req.body.skillValue,
            skillCategory: req.body.skillCategory,
            isActive: req.body.isActive,
        });
        newSkill
            .save()
            .then((data) => {
                // console.log(data);
                return res.status(201).send({
                    status: true,
                    message: constants.CREATE_SUCCESS,
                    data: data,
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(301).send({
                    status: false,
                    message: constants.NOT_ADDED_SUCCESS,
                });
            });
    } catch (error) {
        console.log(`Error in Catch ${error.message}`);
        return res.status(500).send({
            status: false,
            message: error.message,
        });
    }
}
exports.update = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        if (
            !req.body
        ) {
            console.log("Required Field ....");
            return res.status(303).send({
                status: false,
                message: constants.REQUIREDFIELDS,
            });
        } else {
            Skill.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
                .then((data) => {
                    if (!data) {
                        return res.status(404).send({
                            status: false,
                            message: constants.NO_RECORD_FOUND,
                        });
                    } else {
                        return res.status(201).send({
                            status: true,
                            message: constants.UPDATE_SUCCESS,
                            data: data,
                        });
                    }
                })
                .catch((err) => {
                    console.log(`Error in Promises ${err}`);
                    return res.status(500).send({
                        status: true,
                        message: constants.SERVER_ERROR,
                    });
                });
        }
    } catch (error) {
        console.log(`Error in Catch ${error}`);
        return res.status().send({
            status: false,
            message: error.message,
        });
    }
}
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        Skill.findByIdAndDelete(id)
            .then((data) => {
                if (!data) {
                    return res.status(404).send({
                        status: false,
                        message: constants.NO_RECORD_FOUND,
                    })
                }
                else {
                    res.status(201).send({
                        status: true,
                        message: constants.RECORD_DELETED,

                    })
                }
            }).catch((err) => {
                return res.status().send({
                    status: false,
                    message: constants.SERVER_ERROR
                })
            })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: false,
            message: error.message

        })
    }
}