const express = require('express')
const router = express.Router()
const callsModel = require('../models/calls');

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
});


router.post('/', async (req, res) => {
    try{
        let callLogArray = req.body.callLog
        let newCallLogArray = callLogArray.map((eachLog) => {
            let callType;
            switch(eachLog.callType) {
                case '1':
                    callType = 'Incoming'
                    break;
                case '2':
                    callType = 'Outgoing'
                    break;
                case '3':
                    callType = 'Missed'
                    break;
                case '5':
                    callType = 'Rejected'
                    break;
                default:
                    callType = 'Invalid'
                    break;
            }
            eachLog.callType = callType;
            return eachLog;
        });

        try{
            await callsModel.create(newCallLogArray);
            res.status(200).json({result: 'success'})
        } catch(e) {
            res.status(500).json({result: 'Failed'})
        }

    } catch(e) {
        res.status(400).json({result: 'bad request'})
    }
});


module.exports = router