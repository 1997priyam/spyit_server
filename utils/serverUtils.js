const moment = require('moment');

module.exports = {
    convertToIST: (ts) => {
        try{
            return new moment(ts).utcOffset("+05:30").format('DD-MM-YYYY HH:mm:ss');
        } catch(e) {
            console.log('Incorrect TS: ', ts);
            return ts;
        }
    }
}

