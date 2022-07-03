const express = require("express");
const router = express.Router();
const portfolioController = require('../controllers/portfolio')





const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname); //Appending extension
    },
});

var upload = multer({ storage: storage })

var multipleUpload = multer({ storage: storage }).array('files')










router.get("/", function (req, res, next) {
    res.send("respond with a resource Portfolio");
});

router.get('/get/:limit/:offset', ((req, res) => {
    portfolioController.getAll(req, res)
}))
router.get('/get/:id', ((req, res) => {
    portfolioController.getById(req, res)
}))
router.post('/create', upload.single("projectImage"), ((req, res) => {
    portfolioController.createNew(req, res)
}))
router.patch('/update/:id', upload.single("projectImage"), ((req, res) => {
    portfolioController.update(req, res)
}))
router.delete('/delete/:id', ((req, res) => {
    portfolioController.delete(req, res)
}))


module.exports = router;