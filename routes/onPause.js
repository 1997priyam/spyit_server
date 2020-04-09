const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  let { pause, email } = req.body;
  let botSocketList = require('../server').botSocketList;
  let success = false;
  for (socket of botSocketList) {
      if(socket.email === email && socket.connected && socket !== null){
        socket.emit('relaySwitch', {pause: pause});
        success = true;
        break;
      }
  }
    success ? res.status(200).json({result: 'success'}) : res.json({result: 'fail'})
});


module.exports = router