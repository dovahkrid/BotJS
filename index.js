const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const verificationController = require('./controllers/verification');
const messageWebHookController = require('./controllers/messageWebhook');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', verificationController);
app.post('/', messageWebHookController);

app.listen(5000, () => console.log('Listen port 5000'));
