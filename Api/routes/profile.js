const express = require("express");
const router = express.Router();
const profileUserController = require('../controllers/profile')

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

router.get('/getprofileUsers/:limit/:offset', (req, res) => {
    profileUserController.getAllProfile(req, res)
})
router.get('/getProfileUser/:id', (req, res) => {
    profileUserController.getProfileUserById(req, res)
})
router.post('/newProfileUser', upload.single('image'), (req, res) => {
    profileUserController.createNewProfile(req, res)
})
router.patch('/updateProfile/:id', upload.single('image'), (req, res) => {
    profileUserController.updateProfileUser(req, res)
})
router.delete('/deleteProfile/:id', ((req, res) => {
    profileUserController.deleteUserProfile(req, res)
}))


module.exports = router;