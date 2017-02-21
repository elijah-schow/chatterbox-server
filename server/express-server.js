// Modules
var express = require('express');
var bodyParser = require('body-parser');
var messages = require('./express-messages');
var app = express();


// Middleware
app.use(bodyParser.json()); // support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support URL-encoded bodies
app.use('/classes/messages', APIHeaders);


// Routes
app.use( '/', express.static('../client'));
app.get('/classes/messages', getMessages);
app.post('/classes/messages', postMessages);


// Start Listener
app.listen(3000, function() {console.log('Listening on port 3000.')});


// Route Handlers
function getMessages(request, response) {
  var data = messages.get();
  response.send(
    data ? JSON.stringify({ 'results': data }) : '{results:[]}'
  );
}

function postMessages(request, response) {
  response.send(
    JSON.stringify(
      messages.post(request.body)
    )
  );
}


// Helper Functions
function output(data) {
  return data ? JSON.stringify({ 'results': data }) : '{results:[]}';
}

function APIHeaders(request, response, next) {
  // response.header('Access-Control-Allow-Origin', '*');
  // response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  response.header('Content-Type', 'application/json');
  next();
}
