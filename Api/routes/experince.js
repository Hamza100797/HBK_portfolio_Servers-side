const express = require("express");
const router = express.Router();
const experienceController = require('../controllers/experienceController')

router.get("/", function (req, res, next) {
    res.send("respond with a resource Experience");
});

router.get('/get/:limit/:offset', ((req, res) => {
    experienceController.getAllRecord(req, res)
}))
router.get('/get/:id', ((req, res) => {
    experienceController.getRecordById(req, res)
}))
router.post('/create', ((req, res) => {
    experienceController.createRecord(req, res)
}))
router.patch('/update/:id', ((req, res) => {
    experienceController.updateRecord(req, res)
}))
router.delete('/delete/:id', ((req, res) => {
    experienceController.deleteRecord(req, res)
}))


module.exports = router;