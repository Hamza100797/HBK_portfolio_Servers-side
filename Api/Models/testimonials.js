const mongoose = require('mongoose');


const TestimonialSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    clientName: { type: String, required: true },
    message: { type: String, required: true },
    companyName: { type: String },
    designation: { type: String },
    image: { type: mongoose.Schema.Types.Mixed, required: true },
    isActive: { type: Boolean, default: true, required: true },
},
    { timestamps: true, versionKey: false }
);
module.exports = mongoose.model('Testimonial', TestimonialSchema)