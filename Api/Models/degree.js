const mongoose = require('mongoose');


const degreeDetailsSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    degreeTitle: { type: String, default: "", required: true },
    dateTo: { type: Date, required: true },
    dateFrom: { type: Date },
    details: { type: String, required: true },
    isActive: { type: Boolean, default: true, required: true },
},
    { timestamps: true, versionKey: false }
);
module.exports = mongoose.model('DegreeDetails', degreeDetailsSchema)