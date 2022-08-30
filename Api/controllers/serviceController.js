const constants = require('../constants/messages');
const Service = require('../Models/newService');
const mongoose = require('mongoose')
const fs = require('file-system');

exports.getAll = async (req, res) => {
    const service_Data = await Service.find();
    // console.log(service_Data)
    try {
        let totalRecord = await Service.countDocuments({ isDeleted: false });
        if (!totalRecord == 0) {
            let service_Data = await Service.find({ isDeleted: false })
                .sort({ _id: -1 })
                .limit(parseInt(req.params.limit) || 10)
                .skip(parseInt(req.params.offset) - 1)
                .exec();
            return res.status(200).send({
                status: true,
                message: constants.RETRIEVE_SUCCESS,
                totalRecord,
                service_Data
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
exports.getById = async (req, res) => {
    try {
        const id = req.params.id
        Service.findById(id)
            .then((data) => {
                return res.status(200).send({
                    status: true,
                    message: constants.RECORD_FOUND,
                    record: data

                })
            }).catch((err) => {
                return res.status(404).send({
                    status: false,
                    message: constants.NO_RECORD_FOUND,

                })
            })
    } catch (error) {
        return res.status(505).send({
            status: false,
            message: error.message
        })
    }
}
exports.createNew = async (req, res) => {

    try {
        if (!req.file) {
            res.status(403).send({
                status: false,
                message: "Please Select File"
            })
        }
        else if (req.file) {
            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');
            var serviceIconThumbnail = {
                contentType: req.file.mimetype,
                image: Buffer.from(encode_image, 'base64')
            };
        }
        else
            res.status(500).send({
                status: false,
                message: "Something went wrong getting file"
            })

        if (
            !req.body.serviceTitle ||
            !req.body.serviceDescription

        ) {
            return res.status(403).send({
                status: false,
                message: constants.REQUIREDFIELDS,
            });
        }

        const newService
            = new Service({
                _id: new mongoose.Types.ObjectId,
                serviceTitle: req.body.serviceTitle,
                serviceDescription: req.body.serviceDescription,
                serviceIcon: serviceIconThumbnail,
                isActive: req.body.isActive,
            });
        newService
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
                // console.log(err);
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
    // console.log(id);
    try {
        if (
            !req.body

        ) {
            // console.log(req.body)
            // console.log("Required Field ....");
            return res.status(303).send({
                status: false,
                message: constants.REQUIREDFIELDS,
            });
        } else {
            Service.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
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
        console.log(id)
        Service.findByIdAndDelete(id)
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
        // console.log(error)
        return res.status(500).send({
            status: false,
            message: constants.SERVER_ERROR,
            message2: error.message

        })
    }
}