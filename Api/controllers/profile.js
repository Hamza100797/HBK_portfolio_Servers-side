const constants = require('../constants/messages');
const Profile = require('../Models/profiles');
const saltRounds = 12;

exports.getAllProfile = async (req, res) => {
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
            message: constant.REQUIREDFIELDS
        })
    }
    try {
        req.body.email = req.body.email.toLowerCase();
        let getEmail = await User.findOne({ email: req.body.email });
        if (getEmail) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: constant.ALREADY_REGISTERED
                })

        }
        else {
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                if (err) {
                    return res.status(500).send({
                        error: err,
                        message: constant.HASHING_PASSWORD
                    })
                }
                else {
                    const newProfile = new User({
                        _id: new mongoose.Types.ObjectId,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        address: req.body.address,

                    })
                    console.log(`New User ${newUser}`)
                    newProfile.save()
                        .then(result => {
                            console.log(`Data is adds successfully ${result}`)
                            res.status(200).send({
                                status: true,
                                newUser: result,
                                message: constant.PROFILE_ADDED
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            res.send({
                                status: false,
                                error: err,
                                message: constant.NOT_ADDED
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
        if (
            !!req.body.userName ||
            !req.body.email ||
            !req.body.userRole ||
            !req.body.details ||
            !req.body.isActive
        ) {
            console.log("Required Field ....");
            return res.status().send({
                status: false,
                message: constants.REQUIREDFIELDS,
            });
        } else {
            Profile.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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