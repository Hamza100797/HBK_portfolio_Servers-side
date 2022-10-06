const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        blogTitle: { type: String, default: "", required: true },
        postedDate: { type: Date, required: true, default: Date.now() },
        blogCategory: {
            type: String,
            enum: [
                "Web-Designing",
                "Web Development",
                "Smart Contract",
                "Block-chain",
                "App-Development",
                "MetaVerse",
            ],
        },
        shortDescription: { type: String, required: true },
        DetailsDescription: { type: String, required: true },
        isActive: { type: String, required: true, default: true },
        blogImage: { type: mongoose.Schema.Types.Mixed, required: true },
    },
    { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("BlogDetails", blogSchema);
