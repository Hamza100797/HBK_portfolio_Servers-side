const constants = require('../constants/messages');
const Service = require('../Models/newService');

exports.getAll = async (req, res) => {
    try {
        const totalRecord = await Service.countDocuments({ isDeleted: false });
        const records = await Service.find({ isDeleted: false })
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
    if (
        !req.body.serviceTitle ||
        !req.body.serviceDescription ||
        !req.body.serviceIcon ||
        !req.body.isActive
    ) {
        return res.status().send({
            status: false,
            message: constants.REQUIREDFIELDS,
        });
    }
    try {
        const newDegree = new Service({
            _id: new mongoose.Types.ObjectId,
            serviceTitle: req.body.serviceTitle,
            serviceDescription: req.body.serviceDescription,
            isActive: req.body.isActive,
        });
        newService
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
}
exports.update = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        if (
            !req.body.serviceTitle ||
            !req.body.serviceDescription ||
            !req.body.serviceIcon ||
            !req.body.isActive
        ) {
            console.log("Required Field ....");
            return res.status(303).send({
                status: false,
                message: constants.REQUIREDFIELDS,
            });
        } else {
            Degree.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
        return res.status().send({
            status: false,
            message: error.message,
        });
    }
}
exports.delete = async (req, res) => {
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
                    res.status().send({
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
            message: constants.SERVER_ERROR,
            message2: error.message

        })
    }
}