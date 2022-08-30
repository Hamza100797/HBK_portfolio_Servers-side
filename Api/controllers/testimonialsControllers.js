const mongoose = require('mongoose');
const Testimonial = require('../Models/testimonials');
const constants = require('../constants/messages');
const fs = require('fs');


exports.getAll = async (req, res) => {
    try {
        const totalRecords = await Testimonial.countDocuments({ isDeleted: false });
        const records = await Testimonial.find({ isDeleted: false })
            .then((data) => {
                return res.send({
                    status: true,
                    isSuccess: true,
                    message: constants.Fetch_SUCCESS,
                    records: data
                })
            })
            .catch((err) => {
                return res.status(500).send({
                    status: false,
                    isSuccess: false,
                    message: constants.FETCHERROR,
                    error: err

                })
            })

    } catch (error) {
        return res.status(500).send({
            status: false,
            isSuccess: false,
            message: constants.SERVER_ERROR,
            error: error
        })
    }
}

exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        Testimonial.findById(id)
            .then(data => {
                return res.status(200).send({
                    status: true,
                    isSuccess: true,
                    message: constants.Fetch_SUCCESS,
                    records: data
                })
            })
            .catch(err => {
                return res.status(500).send({
                    status: false,
                    isSuccess: false,
                    message: constants.FETCHERROR,
                    error: err
                })
            })

    } catch (error) {
        return res.status(500).send({
            status: false,
            isSuccess: false,
            message: constants.SERVER_ERROR,
            error: error

        })
    }
}
exports.createNew = async (req, res) => {

    try {
        console.log(req.body.image)
        if (!req.body.clientName || !req.body.message || !req.body.designation) {
            return res.status(500).send({
                status: false,
                message: constants.REQUIREDFIELDS
            })
        }
        if (!req.file) {

            return res.status(500).send({
                status: false,
                message: "Please Upload File"
            })

        }
        if (req.file) {
            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');
            var finalImg = {
                contentType: req.file.mimetype,
                image: Buffer.from(encode_image, 'base64')
            };
        }

        const newTestimonials = new Testimonial({
            _id: new mongoose.Types.ObjectId,
            clientName: req.body.clientName,
            message: req.body.message,
            companyName: req.body.companyName,
            designation: req.body.designation,
            image: finalImg

        })
        console.log(newTestimonials)
        newTestimonials.save()
            .then(result => {
                console.log(`Data is adds successfully ${result}`)
                res.status(200).send({
                    status: true,
                    newProfile: result,
                    message: constants.Testimonilas
                })
            })
            .catch(err => {
                console.log(err)
                res.status(400).send({
                    status: false,
                    error: err,
                    message: constants.NOT_ADDED
                })
            })

    } catch (error) {
        return res.status(500).send({
            status: false,
            isSuccess: false,
            message: constants.SERVER_ERROR,
            error: error.message
        })
    }


}
exports.update = async (req, res) => {
    let id = req.params.id;
    console.log(id)
    try {
        if (!req.body.clientName || !req.body.message || !req.body.designation) {
            console.log('Something is missing');
            return res.status(400).send({
                status: false,
                message: constants.REQUIREDFIELDS
            })
        }
        else {
            Testimonial.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
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
        Testimonial.findByIdAndDelete(id)
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