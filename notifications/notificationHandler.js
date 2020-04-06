const notificationsModel = require('../models/notifications');

module.exports = {
    saveNotificationToDb: async function saveNotificatonToDb(data) {
        try{
            let savedDoc = await notificationsModel.create(data.data);
            console.log('Saved Notifications to DB: ', savedDoc);
        } catch(e) {
            if(e.code !== 11000){
                console.log('Error in saving Notifications to DB: ', e);
            }
            else {
                console.log('Duplicate Text Key found in DB. NOT INSERTING');
            }
        }
    }
}

