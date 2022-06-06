const mongoose = require('mongoose');


const RegisterUsersSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    fName: { type: String, default: "", required: true },
    lName: { type: String, default: "", required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    address: { type: String, default: "", required: true },
    checkTOC: { type: Boolean, default: false, required: true },
},
    { timestamps: true, versionKey: false }
);
module.exports = mongoose.model('users', RegisterUsersSchema)