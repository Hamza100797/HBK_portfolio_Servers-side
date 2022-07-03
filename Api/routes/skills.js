const express = require("express");
const router = express.Router();
const SkillsController = require('../controllers/skillsController')








router.get("/", function (req, res, next) {
    res.send("respond with a resource Skills");
});

router.get('/get/:limit/:offset', ((req, res) => {
    SkillsController.getAll(req, res)
}))
router.get('/get/:id', ((req, res) => {
    SkillsController.getById(req, res)
}))
router.post('/create', ((req, res) => {
    SkillsController.createNew(req, res)
}))
router.patch('/update/:id', ((req, res) => {
    SkillsController.update(req, res)
}))
router.delete('/delete/:id', ((req, res) => {
    SkillsController.delete(req, res)
}))


module.exports = router;