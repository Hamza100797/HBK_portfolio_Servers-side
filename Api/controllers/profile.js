const constants = require('../constants/messages');
const Profile = require('../Models/profiles');
const saltRounds = 12;
const bcrypt = require('bcrypt')
const mongoose = require("mongoose")

const fs = require('file-system');




exports.getAllProfile = async (req, res) => {
    const Profile_data = await Profile.find();
    console.log(Profile_data)
    try {
        let totalRecord = await Profile.countDocuments({ isDeleted: false });
        if (!totalRecord == 0) {
            let Profile_data = await Profile.find({ isDeleted: false })
                .sort({ _id: -1 })
                .limit(parseInt(req.params.limit) || 10)
                .skip(parseInt(req.params.offset) - 1)
                .exec();

            return res.status(200).send({
                status: true,
                message: constants.RETRIEVE_SUCCESS,
                totalRecord,
                Profile_data
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
exports.getProfileUserById = async (req, res) => {
    try {
        const id = req.params.id
        Profile.findById(id)
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
exports.createNewProfile = async (req, res) => {
    if (!req.body.userName || !req.body.email || !req.body.password || !req.body.userRole) {
        return res.status(500).send({
            status: false,
            message: constants.REQUIREDFIELDS
        })
    }
    try {
        req.body.email = req.body.email.toLowerCase();
        let getEmail = await Profile.findOne({ email: req.body.email });
        if (getEmail) {
            return res
                .status(406)
                .send({
                    status: false,
                    message: constants.ALREADY_REGISTERED
                })

        }
        else {
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                if (err) {
                    return res.status(500).send({
                        error: err,
                        message: constants.HASHING_PASSWORD
                    })
                }
                else {
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

                    const newProfile = new Profile({
                        _id: new mongoose.Types.ObjectId,
                        userName: req.body.userName,
                        email: req.body.email,
                        password: hash,
                        userRole: req.body.userRole,
                        image: finalImg

                    })
                    console.log(`New User Profile ${newProfile}`)
                    newProfile.save()
                        .then(result => {
                            console.log(`Data is adds successfully ${result}`)
                            res.status(200).send({
                                status: true,
                                newProfile: result,
                                message: constants.PROFILE_ADDED
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            res.send({
                                status: false,
                                error: err,
                                message: constants.NOT_ADDED
                            })
                        })
                }
            })
        }
    }
    catch (error) {
        console.log("Error!", error);
        return res.status(500).json({ status: false, message: error.message });
    }


}
exports.updateProfileUser = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        if (!req.body) {
            console.log("Required Field ....");
            return res.status(402).send({
                status: false,
                message: constants.REQUIREDFIELDS,
            });
        } else {
            Profile.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
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
        return res.status(500).send({
            status: false,
            message: error.message,
        });
    }
}
exports.deleteUserProfile = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        Profile.findByIdAndDelete(id)
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