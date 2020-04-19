const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
    } 
    res.redirect('/login');
})

module.exports = router