const io = require('socket.io-client');
var socket = io('http://localhost'+':4000');       //Connect socket to node.js server

socket.emit('notificationPosted', {data: [{
    "app":"com.whatsapp",
    "ticker":"WhatsApp",
    "text":"Checking for new messages",
    "title":"WhatsApp",
    "email": "utkarshmalik211@gmail.com",
    "ts": "2020-04-05 14:24:00"
},
{
    "app":"com.sdsdv",
    "ticker":"Whsadvp",
    "text":"Checkinsdvsdvsages",
    "title":"Wsadvsdv",
    "email": "utkarshmalik211@gmail.com",
    "ts": "2020-04-05 14:24:00"
},
{
    "app":"com.wef",
    "ticker":"W235App",
    "text":"Checki45465765messages",
    "title":"W657567567p",
    "email": "utkarshmalik211@gmail.com",
    "ts": "2020-04-05 14:24:00"
}]});


