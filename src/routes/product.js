const express = require('express');
const { addProducts, getProductsBySlug } = require('../controller/product');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const { adminMiddleware, requireSignin } = require('../common-middleware');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function(req, file, cb){
        cb(null, shortid.generate() + '' + file.filename)
    }
});

const upload = multer({ storage })

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'),addProducts);
router.get('/products/:slug', getProductsBySlug);

module.exports = router;