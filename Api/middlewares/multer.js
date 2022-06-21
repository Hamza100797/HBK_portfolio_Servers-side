const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
});

var upload = multer({ storage: storage }).single('file');

var multipleUpload = multer({ storage: storage }).array('files')

exports.module = upload
exports.module = multipleUpload