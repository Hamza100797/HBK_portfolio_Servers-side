const mongoose = require("mongoose");

const addSkillsSchema = new mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        skillTitle: { type: String, default: "", required: true },
        skillValue: { type: String, required: true },
        skillCategory: {
            type: String,
            enum: ["webDesign", "frontEnd", "backEnd", "tools"],
        },
        isActive: { type: Boolean, default: true, required: true },
    },
    { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("AddSkills", addSkillsSchema);