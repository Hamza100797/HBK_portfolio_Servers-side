const express = require("express");
const router = express.Router();
const TestimonialsController = require('../controllers/testimonialsControllers')



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
    res.send("respond with a resource Testimonials");
});

router.get('/get/:limit/:offset', ((req, res) => {
    TestimonialsController.getAll(req, res)
}))
router.get('/get/:id', ((req, res) => {
    TestimonialsController.getById(req, res)
}))
router.post('/create', upload.single('image'), ((req, res) => {
    TestimonialsController.createNew(req, res)
}))
router.patch('/update/:id', upload.single('image'), ((req, res) => {
    TestimonialsController.update(req, res)
}))
router.delete('/delete/:id', ((req, res) => {
    TestimonialsController.delete(req, res)
}))


module.exports = router;