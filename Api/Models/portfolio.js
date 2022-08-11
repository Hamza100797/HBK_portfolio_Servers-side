const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        projectTitle: { type: String, default: "", required: true },
        projectTagline: { type: String, default: "", required: true },
        url: { type: String, default: "", required: true },
        publishDate: { type: String, default: "", required: true },
        projectCategory: {
            type: String,
            enum: [
                "webDesigning",
                "webDev",
                "AppDev",
                "backEnd",
                "smartContract",
                "blockChainApplication",
            ],
        },
        aboutProject: { type: String, required: true },
        technologyUsed: { type: String, required: true },
        projectImage: { type: mongoose.Schema.Types.Mixed, required: true },
        isActive: { type: Boolean, default: true, required: true },
    },
    { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("Portfolio-Projects", portfolioSchema);
