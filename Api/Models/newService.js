const mongoose = require('mongoose');


const newServiceSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    serviceTitle: { type: String, required: true },
    serviceDescription: { type: String, required: true },
    serviceIcon: { type: mongoose.Schema.Types.Mixed, required: true },
    isActive: { type: Boolean, required: true, default: true },

},
    { timestamps: true, versionKey: false }
);
module.exports = mongoose.model('newService', newServiceSchema)