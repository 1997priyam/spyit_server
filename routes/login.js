const express = require('express');
const router = express.Router();
const sessionChecker = require('../utils/serverUtils').sessionChecker;
const path = require('path');
const userModel = require('../models/users');

router.get('/', sessionChecker, (req, res) => {
    res.sendFile(path.resolve('html/login.html'));
});

router.post('/', sessionChecker, async (req, res) => {
    
    let { username, password } = req.body;
    if(!username || !password) return res.status(400).json({Error: 'badRequest'});
    let user;
    try{
        user = await userModel.findOne({email: username});
    } catch (e) {
        console.log(e);
        return res.status(500).json({Error: 'Server Error'});
    }
    if (!user) return res.status(401).json({Error: 'User not Found !!'});
    if (user.password === password){
        req.session.user = {
            username,
            url: user.url
        }
        res.redirect('/');
    } else {
        return res.status(401).json({Error: 'Incorrect Password'});
    }
});

router.put('/', sessionChecker, async (req, res) => {
    let { username, password } = req.body;
    if(!username || !password) return res.status(400).json({Error: 'Bad request'});
    let user, createdUser;
    try{
        user = await userModel.findOne({email: username});
    } catch (e) {
        console.log(e);
        return res.status(500).json({Error: 'Server Error'});
    }
    if(user) {
        return res.json({Error: "Username already exists!"});
    } else {
        let url = 'youtube://openapp?user=' + username;
        createdUser = await userModel.create({email: username, password, url});
    }
    if(createdUser) {
        return res.json(createdUser);
    }
});

module.exports = router