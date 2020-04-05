const express = require('express')
const router = express.Router()
const notificationsModel = require('../models/notifications');

router.get('/', async (req, res) => {
    try{
        let { num, email } = req.query;
        console.log(email);
        let notifications;
        if (typeof email !== 'undefined'){
            notifications = await notificationsModel.find({email: email}).sort({createdOn: -1}).limit(parseInt(num));
        }
        else{
            notifications = await notificationsModel.find().sort({createdOn: -1}).limit(parseInt(num));
        }
        res.json({data: notifications});
    } catch(e) {
        console.log('Error in getting notifications from DB: ', e);
        res.status(500).end();
    }
})


module.exports = router