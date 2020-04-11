const express = require('express');
const router = express.Router();
const multer = require('multer');
const glob = require('glob');
const fs = require('fs');


var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./uploads");
    },
    filename: function(req, file, callback) {
        // console.log(file)
        callback(null, file.originalname);
    }
});

router.post('/', (req, res) => {
    console.log("A file is being uploaded.....")
    let upload = multer({ storage: storage }).single('file');
    upload(req, res, function(err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
})

router.delete('/', (req, res) => {
    let email = req.body.email;
    glob.glob('uploads/'+email+'*.mp3' , (err, file) => {
        for (f of file){
            fs.unlinkSync(f);
        }
        res.status(200).json({result: 'success'})
    });
    // console.log(fileArray);
})
module.exports = router