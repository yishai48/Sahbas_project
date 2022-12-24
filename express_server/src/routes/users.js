const express = require('express');
const router = express.Router();
const {
    
    signup,
    login
    
} = require('../controlers/users');
router.post('/signup',signup);
router.post('/login',login);


module.exports = router;