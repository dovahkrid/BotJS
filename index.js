const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const verificationController = require('./controllers/verification');
const messageWebHookController = require('./controllers/messageWebhook');
const imageSearchController = require('./controllers/imageSearch');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', verificationController);
app.post('/', messageWebHookController);
app.post('/image-search', imageSearchController);

app.listen(5000, () => console.log('Listen port 5000'));
