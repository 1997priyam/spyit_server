const notificationsModel = require('../models/notifications');

module.exports = {
    saveNotificationToDb: async function saveNotificatonToDb(data) {
        try{
            let savedDoc = await notificationsModel.create(data.data);
            console.log('Saved Notifications to DB: ', savedDoc);
        } catch(e) {
            console.log('Error in saving Notifications to DB: ', e);
        }
    }
}

