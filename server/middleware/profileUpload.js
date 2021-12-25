const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        console.log('looking file -->> ', file.originalname);
        cb(null, file.originalname);
    }
});

// var upload = multer({ storage: storage }).single('file');
var upload = multer({ storage: storage });

module.exports = upload;