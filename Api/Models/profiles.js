const mongoose = require('mongoose');


const userProfileSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userName: { type: String, default: "", required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userRole: { type: String, enum: ['blogger', 'author', 'organizer'], required: true },
    image: { type: String, required: true },
    isActive: { type: Boolean, default: true, required: true },
},
    { timestamps: true, versionKey: false }
);
module.exports = mongoose.model('ProfileUsers', userProfileSchema)