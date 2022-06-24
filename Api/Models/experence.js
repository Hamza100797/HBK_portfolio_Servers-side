const mongoose = require('mongoose');


const experienceDetailsSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    companyName: { type: String, default: "", required: true },
    dateTo: { type: String, required: true },
    dateFrom: { type: String },
    JobDescription: { type: String, required: true },
    isActive: { type: Boolean, default: true, required: true },
},
    { timestamps: true, versionKey: false }
);
module.exports = mongoose.model('ExperienceDetails', experienceDetailsSchema)