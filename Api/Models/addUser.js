const mongoose = require('mongoose');


const dashboardUsers = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userName: { type: String, default: "", required: true },
    email: { type: String, unique: true, required: true },
    userRole: { type: String, enum: ["blogger", "author", "organization"] },
    password: { type: String, required: true },
    image: { type: String, default: "", required: true },
    isActive: { type: Boolean, default: true, required: true },
},
    { timestamps: true, versionKey: false }
);
module.exports = mongoose.model('dashboard-users', dashboardUsers)