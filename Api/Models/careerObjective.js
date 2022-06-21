const mongoose = require('mongoose');


const careerObjectiveSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    careerObjective: { type: String, default: "", required: true },
},
    { timestamps: true, versionKey: false }
);
module.exports = mongoose.model('CareerObjective', careerObjectiveSchema)