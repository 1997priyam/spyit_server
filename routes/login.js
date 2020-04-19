const express = require('express');
const router = express.Router();
const sessionChecker = require('../utils/serverUtils').sessionChecker;
const path = require('path');

router.get('/', sessionChecker, (req, res) => {
    res.sendFile(path.resolve('html/login.html'));
});

router.post('/', sessionChecker, (req, res) => {
    
    let { user, pass } = req.body;

    if (user === 'priyam' && pass === 'priyam'){
        req.session.user = {user: user}
        res.redirect('/');
    }
});

module.exports = router