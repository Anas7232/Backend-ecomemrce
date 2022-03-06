const express = require('express');
const { addCategory, getAllCategory } = require('../controller/category');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const { requireSignin, adminMiddleware } = require('../common-middleware');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function(req, file, cb){
        cb(null, shortid.generate() + '' + file.filename);
    }
});

const upload = multer({ storage })


router.post('/category/create', requireSignin,adminMiddleware ,upload.single('categoryImage') ,addCategory);
router.get('/category/getcategory', getAllCategory)


module.exports = router;