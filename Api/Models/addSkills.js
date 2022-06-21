const mongoose = require("mongoose");

const addSkillsSchema = new mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        skillsTitle: { type: String, default: "", required: true },
        skillsValue: { type: String, unique: true, required: true },
        skillsCategory: {
            type: String,
            enum: ["webDesign", "frontEnd", "backEnd", "tools"],
        },
        isActive: { type: Boolean, default: true, required: true },
    },
    { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("AddSkills", addSkillsSchema);
