const constants = require('../constants/messages');
const Portfilio = require('../Models/portfolio')


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
        if (!projectTagline || !url || !publishDate || !projectCategory || !aboutProject || !technologyUsed || !projectImage) {
            return res.status(300).send({
                status: false,
                message: constants.REQUIREDFIELDS
            })
        }
        else {
            const newPortfilio = new Portfilio({
                projectTitle: req.body.projectTitle,
                projectTagline: req.body.projectTagline,
                url: req.body.url,
                publishDate: req.body.publishDate,
                projectCategory: req.body.projectCategory,
                aboutProject: req.body.aboutProject,
                technologyUsed: req.body.technologyUsed,
                projectImage: req.file.path,
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
    const id = req.params.id;
    console.log(id);
    try {
        if (
            !req.body.projectTitle ||
            !req.body.projectTagline ||
            !req.body.url ||
            !req.body.publishDate ||
            !req.body.projectCategory ||
            !req.body.aboutProject ||
            !req.body.technologyUsed ||
            !req.body.projectImage
        ) {
            console.log("Required Field ....");
            return res.status().send({
                status: false,
                message: constants.REQUIREDFIELDS,
            });
        } else {
            Portfilio.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
                .then((data) => {
                    if (!data) {
                        return res.status(404).send({
                            status: false,
                            message: constants.NO_RECORD_FOUND,
                        });
                    } else {
                        return res.status(201).send({
                            status: false,
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
        return res.status(505).send({
            status: false,
            message: error.message,
        });
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
                return res.status().send({
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