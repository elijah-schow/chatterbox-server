var qs = require('qs');
var url = require('url');
var random = require('randomstring');

// var URL = require('url');
/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

var messages = {};

messages._data = [ 
  { 
    createdAt: '2017-02-20T17:41:38.634Z',
    objectId: 'LioZsqlCvs',
    roomname: 'lobby',
    text: 'Hello, world!',
    username: 'Jane Doe',
    updatedAt: '2017-02-20T17:41:38.634Z'
  },
];

messages.get = function() {
  return messages._data;
};

messages.post = function(message) {
  messages._data.push({

    createdAt: (new Date()).toString(),
    objectId: random.generate(16),
    message: message.message,
    text: message.text,
    username: message.username,
    roomname: message.roomname || 'lobby'
  });

};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var requestHandler = function(request, response) {

  var urlObject = url.parse( request.url );
  // console.log(urlObject);
  var headers = defaultCorsHeaders;
  
  if (request.method === 'OPTIONS' && urlObject.pathname === '/classes/messages' ) {

    headers['Content-Type'] = 'application/json';
    response.writeHead(200, headers);
    response.end('Allow: HEAD, GET, POST, OPTIONS');

  } else if (request.method === 'GET' && urlObject.pathname === '/classes/messages') {

    // Set up header
    headers['Content-Type'] = 'application/json';
    response.writeHead(200, headers);
    // Set up body
    var body = JSON.stringify({
      'results': messages.get()
    });
    // Send the response
    response.end(body);

  } else if (request.method === 'POST' && urlObject.pathname === '/classes/messages') {

    var postData = '';
    request.on('data', (data) => {
      postData += data;
    });

    request.on('end', () => {
      var parsedData;
      try {
        parsedData = JSON.parse(postData);
      } catch ( error) {
        parsedData = qs.parse(postData);
      } 
      messages.post(parsedData);
    });
    
    response.writeHead(201, headers);
    response.write('{"results": []}');
    response.end();

  } else {

    response.writeHead(404, headers);
    response.end();

  } 



  // // Request and Response come from node's http module.
  // //
  // // They include information about both the incoming request, such as
  // // headers and URL, and about the outgoing response, such as its status
  // // and content.
  // //
  // // Documentation for both request and response can be found in the HTTP section at
  // // http://nodejs.org/documentation/api/

  // // Do some basic logging.
  // //
  // // Adding more logging to your server can be an easy way to get passive
  // // debugging help, but you should always be careful about leaving stray
  // // console.logs in your code.
  // console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // // The outgoing status.
  // var statusCode = 200;

  // // See the note below about CORS headers.
  // var headers = defaultCorsHeaders;

  // // Tell the client we are sending them plain text.
  // //
  // // You will need to change this if you are sending something
  // // other than plain text, like JSON or HTML.
  // headers['Content-Type'] = 'application/json';

  // // .writeHead() writes to the request line and headers of the response,
  // // which includes the status and all headers.
  // response.writeHead(statusCode, headers);

  // // Make sure to always call response.end() - Node may not send
  // // anything back to the client until you do. The string you pass to
  // // response.end() will be the body of the response - i.e. what shows
  // // up in the browser.
  // //
  // // Calling .end "flushes" the response's internal buffer, forcing
  // // node to actually send all the data over to the client.
};

exports.requestHandler = requestHandler;
//exports.requestHandler = requestHandler;

