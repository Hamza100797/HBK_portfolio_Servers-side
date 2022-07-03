const express = require("express");
const router = express.Router();
const carrerObjController = require('../controllers/careerController')

router.get("/", function (req, res, next) {
    res.send("respond with a resource Career objective");
});

router.get('/get/:limit/:offset', ((req, res) => {
    carrerObjController.getCareerObj(req, res)
}))

router.get('/get/:id', ((req, res) => {
    carrerObjController.getCareerObjById(req, res)
}))

router.post('/create', ((req, res) => {
    carrerObjController.createCareerObj(req, res)
}))
router.patch('/update/:id', ((req, res) => {
    carrerObjController.updateCareerObj(req, res)
}))
router.delete('/delete/:id', ((req, res) => {
    carrerObjController.deleteCareerObj(req, res)
}))


module.exports = router;