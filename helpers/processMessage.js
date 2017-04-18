const FACEBOOK_ACCESS_TOKEN = 'EAADdyZAdFpUABAHhQIkgekFqM08KPZBHujiZBkNnFAVMddCj4qjmwWEv7EpsL2ufE7T1iGlV9RPgMr0nNVZA9QCcQvZB5gxtPkHmxhN7QWfdzuYCxJfrXamKkEJFpO4GIJ4ZCpO8wYGdf4poiQ0vGTwMZCidOpIHvGJYqpUjxqkTQZDZD';
const NGOC_TRINH_IMAGE = 'http://nguoinoitieng.vn/photo/tieu-su-ngoc-trinh-nu-hoang-noi-y-1678.jpg';
const API_AI_TOKEN = '83ed1ec58cc2437a9f6b4e4533a4a9b5';

const request = require('request');
const apiAIClient = require('apiai')(API_AI_TOKEN);

// module.exports = (event) => {
  // const senderID = event.sender.id;
  // const message = event.message.text;
const sendTextMessage = (senderID, text) => {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: FACEBOOK_ACCESS_TOKEN},
    method: 'POST',
    json: {
      recipient: {id: senderID},
      message: {
        // attachment: {
        //   type: 'image',
        //   payload: {url: NGOC_TRINH_IMAGE}
        // }
        text
      }
    }
  }, function(err, res, body){
    if(!err && res.statusCode == 200){
      console.log("Sent !");
    }
    else {
      console.error("Error !");
      console.error(res);
      console.error(err)
    }
  });
};

const sendImageMessage = (senderID, imageUri) => {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: FACEBOOK_ACCESS_TOKEN},
    method: 'POST',
    json: {
      recipient: {id: senderID},
      message: {
        attachment: {
          type: 'image',
          payload: {url: imageUri}
        }
      }
    }
  }, function(err, res, body){
    if(!err && res.statusCode == 200){
      console.log("Sent !");
    }
    else {
      console.error("Error !");
      console.error(res);
      console.error(err)
    }
  });
};

module.exports = (event) => {
  const senderID = event.sender.id;
  const message = event.message.text;
  console.log(message);
  const apiaiSession = apiAIClient.textRequest(message, {
    sessionId: 'botcube_co'
  });
  apiaiSession.on('response', (response) => {
    const result = response.result.fulfillment.speech;
    console.log(result);
    if (response.result.metadata.intentName === 'images.search') {
      if (result === 'error') {
        sendTextMessage(senderID, 'Sorry, can you say that again?');
      }
      sendImageMessage(senderID, result);
    } else {
      sendTextMessage(senderID, result);
    }
  });

  apiaiSession.on('error', error => console.log(error));
  apiaiSession.end();
};
