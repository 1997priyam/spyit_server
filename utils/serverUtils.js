const moment = require('moment');

module.exports = {
    convertToIST: (ts) => {
        try{
            return new moment.utc(ts).local().format('DD-MM-YYYY hh:mm:ss a');
        } catch(e) {
            console.log('Incorrect TS: ', ts);
            return ts;
        }
    }
}

