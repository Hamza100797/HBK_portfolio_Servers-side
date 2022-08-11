const constants = require('../constants/messages');
const Portfilio = require('../Models/portfolio')
const mongoose = require('mongoose')
const fs = require('file-system');


exports.getAll = async (req, res) => {
    try {
        const totalRecord = await Portfilio.countDocuments({ isDeleted: false });
        const records = await Portfilio.find({ isDeleted: false })
            .then((data) => {
                return res.status(200).send({
                    status: true,
                    message: constants.RECORD_FOUND,
                    records: data,
                    totalRecord
                })
            }).catch((err) => {
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
    try {
        const id = req.params.id
        Portfilio.findById(id)
        console.log(Portfilio)
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
            res.status(500).send({
                status: false,
                message: "Please Select File"
            })
        }
        else if (req.file) {
            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');
            var portfolioThumbnail = {
                contentType: req.file.mimetype,
                image: Buffer.from(encode_image, 'base64')
            };
        }
        else {
            return res.status().send({
                status: false,
                message: "Something Went Wrong with File"
            })
        }

        if (!req.body.projectTagline || !req.body.url || !req.body.publishDate || !req.body.projectCategory || !req.body.aboutProject || !req.body.technologyUsed) {
            console.log(req.body)
            return res.status(300).send({
                status: false,
                message: constants.REQUIREDFIELDS
            })
        }

        else {
            const newPortfilio = new Portfilio({
                _id: new mongoose.Types.ObjectId,
                projectTitle: req.body.projectTitle,
                projectTagline: req.body.projectTagline,
                url: req.body.url,
                publishDate: req.body.publishDate,
                projectCategory: req.body.projectCategory,
                aboutProject: req.body.aboutProject,
                technologyUsed: req.body.technologyUsed,
                projectImage: portfolioThumbnail,
                isActive: req.body.isActive
            })
            newPortfilio
                .save()
                .then((data => {
                    console.log(data);
                    return res.status(201).send({
                        status: true,
                        message: constants.CREATE_SUCCESS,
                        data: data,
                    });
                })).catch((err => {
                    return res.status(301).send({
                        status: false,
                        mess: err.message,
                        message: constants.NOT_ADDED_SUCCESS,
                    });
                }))
        }
    } catch (error) {
        return res.status(505).send({
            status: false,
            message: error.message
        })
    }
}
exports.update = async (req, res) => {
    let id = req.params.id;
    console.log(id)
    try {
        if (!req.body.projectTagline || !req.body.url || !req.body.publishDate || !req.body.projectCategory || !req.body.aboutProject || !req.body.technologyUsed) {
            console.log('Something is missing');
            return res.status(300).send({
                status: false,
                message: constants.REQUIREDFIELDS
            })
        }
        else {
            Portfilio.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
                .then((data) => {
                    if (!data) {
                        return res.status(404).send({
                            status: false,
                            message: constants.NO_RECORD_FOUND
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
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        Portfilio.findByIdAndDelete(id)
            .then(data => {
                if (!data) {
                    return res.status(404).send({
                        status: false,
                        message: constants.NO_RECORD_FOUND
                    })
                }
                else {
                    return res.status(200).send({
                        status: true,
                        message: constants.DELETED_SUCCESS
                    })
                }
            }).catch(err => {
                return res.status(500).send({
                    status: false,
                    message: constants.SERVER_ERROR
                })
            })

    } catch (error) {
        return res.status(505).send({
            status: false,
            message: error.message
        })
    }
}