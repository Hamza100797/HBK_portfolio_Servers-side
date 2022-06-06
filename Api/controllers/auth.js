const constant = require('../constants/messages');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../Models/registerUser')
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret_key = "this is sceret key bahi jaan hath na layna mekiu"

// UserRegistration 
exports.registerUser = async (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
        return res.status(500).send({
            status: false,
            message: constant.REQUIREDFIELDS
        })
    }
    try {
        req.body.email = req.body.email.toLowerCase();
        let getUser = await User.findOne({ email: req.body.email });
        if (getUser) {
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
                    const newUser = new User({
                        _id: new mongoose.Types.ObjectId,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        address: req.body.address,

                    })
                    console.log(`New User ${newUser}`)
                    newUser.save()
                        .then(result => {
                            console.log(`Data is adds successfully ${result}`)
                            res.status(200).send({
                                status: true,
                                newUser: result,
                                message: constant.REGISTER_USER
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            res.send({
                                status: false,
                                error: err,
                                message: constant.NOT_REGISTER
                            })
                        })
                }
            })
        }
    }
    catch (error) {
        console.log("Error!", error);
        return res.status(500).json({ status: false, message: ERROR_In_Registeration });
    }
}

// login user 
exports.login = async (req, res) => {
    try {
        console.log(req.body)
        if (!req.body.email || !req.body.password) {
            return res.status(500).send({
                status: false,
                error: err,
                message: constant.REQUIREDFIELDS
            })
        }
        else {
            User.find({ email: req.body.email })
                .exec()
                .then(user => {
                    console.log(`Hello ${user}`)
                    if (user.length < 1) {
                        return res.status(401).json({
                            status: false,
                            error: err,
                            message: constant.NOT_FOUND
                        })
                    }
                    bcrypt.compare(req.body.password, user[0].password, (err, data) => {
                        if (!data) {
                            return res.status(401).json({
                                status: false,
                                error: err,
                                message: constant.PASSWORD_NOT_MATCH
                            })
                        }
                        if (data) {
                            const token = jwt.sign({
                                fName: req.body.fName,
                                lName: req.body.lName,
                                email: req.body.email,

                            },
                                secret_key, { expiresIn: '24h' });
                            res.status(200).send({
                                status: true,
                                message: constant.lOGIN_SUCCESS,
                                data: {
                                    fName: user[0].fName,
                                    lName: user[0].lName,
                                    email: user[0].email,
                                    token: token
                                }
                            })
                        }
                    })
                })
                .catch(err => {
                    console.log("errrorOccur")
                    res.status(500).json({
                        status: false,

                        message: "Email not register"
                    })
                })
        }

    } catch (error) {
        console.log(error)
    }
}
/**Logout on the basis of JWT token */
exports.logout = async (req, res) => {
    try {
        let token = req.headers["authorization"];
        if (!token || !token.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ status: false, message: constant.TOKEN_ERR });
        }
        var accessToken = token.split(" ")[1];
        console.log("TOKEN:::::::::", accessToken);
        var decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        let updateUser = await User.updateOne(
            { _id: decoded.id },
            { tokenStatus: false }
        );
        // console.log("UPDATE RESPONSE::", updateUser);
        if (!updateUser)
            return res
                .status(500)
                .json({ status: false, message: constant.SERVER_ERROR });
        return res
            .status(200)
            .send({ status: true, message: constant.LOGOUT_SUCCESS });
    } catch (error) {
        console.log("ERROR:::", error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
