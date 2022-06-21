const mongoose = require('mongoose');


const newServiceSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    serviceTitle: { type: String, required: true },
    serviceDescription: { type: String, required: true },
    serviceIcon: { type: String, required: true },
    isActive: { type: boolean, required: true, default: true },
},
    { timestamps: true, versionKey: false }
);
module.exports = mongoose.model('newService', newServiceSchema)