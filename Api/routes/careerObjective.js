const express = require("express");
const router = express.Router();
const carrerObjController = require('../controllers/careerController')

router.get("/", function (req, res, next) {
    res.send("respond with a resource Profile");
});

router.get('/get/:limit/:offset', ((req, res) => {
    carrerObjController.getCareerObj(req, res)
}))

router.post('/create', ((req, res) => {
    carrerObjController.createCareerObj(req, res)
}))
router.patch('/update/:id', ((req, res) => {
    carrerObjController.updateCareerObj(req, res)
}))



module.exports = router;