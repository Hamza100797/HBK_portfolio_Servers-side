const constants = require("../constants/messages");
const DegreeModel = require("../Models/degree");
const mongoose = require('mongoose');

exports.getAllDegree = async (req, res) => {
    const degree = await DegreeModel.find().countDocuments({ isDeleted: true });
    let totalRecord = await DegreeModel.countDocuments({ isDeleted: false });
    try {
        if (!degree == 0) {
            console.log("Records Find in DB");

            let degreeRecord = await DegreeModel.find({ isDeleted: false })
                .sort({ _id: -1 })
                .limit(parseInt(req.params.limit) || 10)
                .skip(parseInt(req.params.offset) - 1)
                .exec();
            return res.status(200).send({
                status: true,
                message: constants.RETRIEVE_SUCCESS,
                data: degreeRecord,
                totalRecord,
            });
        } else {
            return res.status(404).send({
                status: false,
                message: constants.NO_RECORD_FOUND,
                totalRecord,
            });
        }
    } catch (error) {
        console.log("Error in try-catch block");
        return res.status(500).send({
            status: false,
            message: error.message,
        });
    }
};

exports.getDegreeById = async (req, res) => {
    let totalRecord = await DegreeModel.countDocuments({ isDeleted: false });
    console.log(totalRecord)
    const id = req.params.id;
    console.log(id)
    DegreeModel.findById(id)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    status: false,
                    message: constants.NOT_FOUND,
                    totalRecord: totalRecord
                });
            } else {
                return res.status(200).send({
                    status: true,
                    message: constants.RECORD_FOUND,
                    records: data,
                    totalRecord: totalRecord
                })
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send({
                status: false,
                message: err.message,
            });
        });
};

exports.createDegree = async (req, res) => {
    if (
        !req.body.degreeTitle ||
        !req.body.dateTo ||
        !req.body.dateFrom ||
        !req.body.uni ||
        !req.body.details
    ) {
        return res.status().send({
            status: false,
            message: constants.REQUIREDFIELDS,
        });
    }
    try {
        const newDegree = new DegreeModel({
            _id: new mongoose.Types.ObjectId,
            degreeTitle: req.body.degreeTitle,
            dateTo: req.body.dateTo,
            dateFrom: req.body.dateFrom,
            details: req.body.details,
            isActive: req.body.isActive,
            uni: req.body.uni
        })
        newDegree
            .save()
            .then((data) => {
                console.log(data);
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
};

exports.updateDegree = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        if (
            !req.body.degreeTitle ||
            !req.body.dateTo ||
            !req.body.dateFrom ||
            !req.body.uni ||
            !req.body.details
        ) {
            console.log("Required Field ....");
            return res.status(300).send({
                status: false,
                message: constants.REQUIREDFIELDS,
            });
        } else {
            DegreeModel.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
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
};
exports.deleteDegreeRecord = async (req, res) => {
    try {
        const id = req.params.id;
        DegreeModel.findByIdAndDelete(id)
            .then((data) => {
                if (!data) {
                    res.status(404).send({
                        status: false,
                        message: constants.NO_RECORD_FOUND,
                    });
                } else {
                    res.status(201).send({
                        status: true,
                        message: constants.DELETED_SUCCESS,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                return res.status(404).send({
                    status: false,
                    message: constants.NOT_FOUND,
                });
            });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: false,
            message: constants.SERVER_ERROR
        })
    }
}
