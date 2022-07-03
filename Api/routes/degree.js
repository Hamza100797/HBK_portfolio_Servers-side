const express = require("express");
const router = express.Router();
const degreeController = require('../controllers/degreeController')

router.get("/", function (req, res) {
    res.send("respond with a resource Degree");
});

router.get('/get/:limit/:offset', ((req, res) => {
    degreeController.getAllDegree(req, res)
}))
router.get('/get/:id', ((req, res) => {
    degreeController.getDegreeById(req, res)
}))
router.post('/create', ((req, res) => {
    degreeController.createDegree(req, res)
}))
router.patch('/update/:id', ((req, res) => {
    degreeController.updateDegree(req, res)
}))
router.delete('/delete/:id', ((req, res) => {
    degreeController.deleteDegreeRecord(req, res)
}))


module.exports = router;