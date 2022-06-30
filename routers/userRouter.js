const express = require('express');

const userCtrl = require('../controllers/userCtrl');
const router = express.Router();


// /api/users/register
// /api/users/login

router.post('/register', userCtrl.post);

router.post('/login', userCtrl.login);



module.exports = router;