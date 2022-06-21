const express = require("express");
const router = express.Router();
const BlogController = require('../controllers/blogController')
const uploadSingle = require('../middlewares/multer')
const uploadMultiple = require('../middlewares/multer')





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
    res.send("respond with a resource Blog");
});

router.get('/get/:limit/:offset', (req, res) => {
    BlogController.getAll(req, res)
})
router.get('/get/:id', (req, res) => {
    BlogController.getById(req, res)
})
router.post('/create', upload.single(''), (req, res) => {
    BlogController.createNew(req, res)
})
router.patch('/update/:id', upload.single(''), (req, res) => {
    BlogController.update(req, res)
})
router.delete('/delete/:id', (req, res) => {
    BlogController.delete(req, res)
})


module.exports = router;