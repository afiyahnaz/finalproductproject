const express = require('express');
const productCtrl = require('../controllers/productCtrl');
const auth = require('../utils/auth');
const upload = require('../utils/uploader');

const router = express.Router();




//http://localhost:3000/api/product/
router.get('/',productCtrl.get);       //duplicate get url
router.get('/page/:page/size/:size',productCtrl.get);


router.post('/', upload.single('img'),productCtrl.post);


//http://localhost:3000/api/product/afggggggg12454555
router.get('/:id',productCtrl.getById);



//index.js ->authenticated -> authorizes -> ctrl -> repo
router.delete('/:id',auth.authorizeAdmin,  productCtrl.remove);
router.put('/:id',productCtrl.update);
router.patch('/:id',productCtrl.patch);
//DELETE http://localhost:3000/api/product/:id


module.exports = router;
