const constants = require('../constants/messages');
const Experience = require('../Models/experence')
const mongoose = require('mongoose');


exports.getAllRecord = async (req, res) => {

    try {
        const Experience = await Experience.find()
        if (Experience) {
            console.log("Records Find in DB");
            let totalRecord = await Experience.countDocuments({ isDeleted: false });
            let ExperienceRecord = await Experience.find({ isDeleted: false })
                .sort({ _id: -1 })
                .limit(parseInt(req.params.limit) || 10)
                .skip(parseInt(req.params.offset) - 1)
                .exec();
            return res.status(200).send({
                status: true,
                message: constants.RETRIEVE_SUCCESS,
                data: ExperienceRecord,
                totalRecord
            })
        }
        else {
            return res.status(404).send({
                status: false,
                message: constants.RETRIEVE_NOT_SUCCESS,
                totalRecord
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: false,
            message: constants.SERVER_ERROR

        })
    }
}
exports.getRecordById = async (req, res) => {
    const id = req.params.id
    Experience.findById(id)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    status: false,
                    message: constants.NOT_FOUND
                })
            }
        }).catch((err) => {
            let totalRecord = Experience.countDocuments({ isDeleted: false });
            return res.status(200).send({
                status: true,
                message: constants.RECORD_FOUND,
                totalRecord
            })
        })
}
exports.createRecord = async (req, res) => {
    try {
        if (!req.body.companyName || !req.body.dateTo || !req.body.dateFrom || !req.body.JobDescription) {
            console.log("Required Fields")
            return res.status(300).send({
                status: false,
                message: constants.REQUIREDFIELDS,
            })
        }
        else {
            const NewExperience = new Experience({
                _id: new mongoose.Types.ObjectId,
                companyName: req.body.companyName,
                JobDescription: req.body.JobDescription,
                dateTo: req.body.dateTo,
                dateFrom: req.body.dateFrom,
                details: req.body.details,
                isActive: req.body.isActive,
            })
            NewExperience.save()
                .then((data) => {
                    return res.status(201).send({
                        status: true,
                        message: constants.ADD_EXPERIENCE,
                        newExperience: data
                    })
                }).catch((err) => {
                    return res.status(500).send({
                        status: false,
                        message: constantss.SERVER_ERROR,
                        message2: err.message
                    })
                })
        }
    } catch (error) {
        return res.status(505).send({
            status: false,
            message: error.message
        })
    }
}
exports.updateRecord = async (req, res) => {
    let id = req.params.id;
    console.log(id)
    try {
        if (!companyName || !dateTo || !dateFrom || !JobDescription) {
            console.log('Something is missing');
            return res.status(300).send({
                status: false,
                message: constantss.REQUIREDFIELDS
            })
        }
        else {
            Experience.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
                .then((data) => {
                    if (!data) {
                        return res.status(404).send({
                            status: false,
                            message: constantss.NO_RECORD_FOUND
                        })
                    } else {
                        return res.status(201).send({
                            status: true,
                            message: constants.UPDATE_SUCCESS,
                            UpdatedRecord: data
                        })
                    }
                }).catch((err) => {
                    return res.status(500).send({
                        status: true,
                        message: constants.SERVER_ERROR,
                    });
                })
        }
    } catch (error) {
        console.log(error)
        return res.status(505).send({
            status: false,
            message: error.message
        })
    }
}
exports.deleteRecord = async (req, res) => {
    try {
        const id = req.params.id;
        Experience.findByIdAndDelete(id)
            .then((data) => {
                if (!data) {
                    return res.status(404).send({
                        status: false,
                        message: constants.NO_RECORD_FOUND,
                    })
                }
                else {
                    res.status(200).send({
                        status: true,
                        message: constants.RECORD_DELETED,

                    })
                }
            }).catch((err) => {
                return res.status(500).send({
                    status: false,
                    message: constants.SERVER_ERROR,
                    msg2: err.message
                })
            })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: false,
            message: constants.SERVER_ERROR,
            message2: error.message

        })
    }
}