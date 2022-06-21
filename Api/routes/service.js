const express = require("express");
const router = express.Router();
const serviceController = require('../controllers/serviceController')





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
    res.send("respond with a resource Profile");
});

router.get('/get/:limit/:offset', ((req, res) => {
    serviceController.getAll(req, res)
}))
router.get('/get/:id', ((req, res) => {
    serviceController.getById(req, res)
}))
router.post('/create', upload.single('serviceIcon'), ((req, res) => {
    serviceController.createNew(req, res)
}))
router.patch('/update/:id', upload.single('serviceIcon'), ((req, res => {
    serviceController.update(req, res)
})))
router.delete('/delete/:id', ((req, res) => {
    serviceController.delete(req, res)
}))


module.exports = router;