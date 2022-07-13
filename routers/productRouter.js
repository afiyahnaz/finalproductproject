const express = require('express');
const multer = require('multer');

const productCtrl = require('../controllers/productCtrl');
const auth = require('../utils/auth');

const router = express.Router();

const storage = multer.diskStorage({
    destination:function(req, file, cb) {
          cb(null, 'uploads/');
    },
    filename:function(req, file, cb) {
        const filename = Date.now() + '-' + Math.round(Math.random()*1E9)+file.originalname;
        cb(null,filename);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      if(file.mimetype ==='image/png' || file.mimetype === 'image/jpeg')
        cb(null);
        else cb('Invalid file type');
    }
     
});

//http://localhost:3000/api/product/
router.get('/',productCtrl.get);       //duplicate get url
router.get('/page/:page/size/:size',productCtrl.get);


router.post('/', upload.single('img'),productCtrl.post);


//http://localhost:3000/api/product/afggggggg12454555
router.get('/:id',productCtrl.getById);



//index.js ->authenticated -> authorizes -> ctrl -> repo
router.delete('/:id', auth.authorizeAdmin, productCtrl.remove);
router.put('/:id',productCtrl.update);
router.patch('/:id',productCtrl.patch);
//DELETE http://localhost:3000/api/product/:id


module.exports = router;
