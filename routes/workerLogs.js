const express = require('express')
const router = express.Router()
const callsModel = require('../models/calls');
const messagesModel = require('../models/messages')

router.get('/', async (req, res) => {
  
});


router.post('/', async (req, res) => {
    console.log("<<<----Wroker Logs POST request --- To dump Logs---->>>")
    console.log("type of req.body is ", typeof(req.body))
    console.log(req.body);
    try{
        let callLogArray = JSON.parse(req.body.callLog);
        let smsArray = JSON.parse(req.body.sms);
        let email = req.body.email;
        let newCallLogArray = callLogArray.map((eachLog) => {
            let { name, number, duration, date } = eachLog;
            let callType;
            switch(eachLog.type) {
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
            return {
                callType,
                name,
                number,
                date,
                email,
                duration
            };
        });
        
        let newSmsArray = smsArray.map((eachSms) => {
            let { name, address, date, body } = eachSms;
            return {
                name,
                address,
                date,
                body,
                email
            };
        })

        try{
            await callsModel.create(newCallLogArray);
            await messagesModel.create(newSmsArray);
            console.log("<<<----- DUMPED THE WORKER LOGS IN DATABASE ----->>>")
            res.status(200).json({result: 'success'})
        } catch(e) {
            console.log(e);
            res.status(500).json({result: 'Failed'})
        }

    } catch(e) {
        console.log(e)
        res.status(400).json({result: 'bad request'})
    }
});


module.exports = router