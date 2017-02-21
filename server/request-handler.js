// var URL = require('url');''
var qs = require('qs');
var random = require('randomstring');
var url = require('url');
var messages = require('./message-database.js');


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

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var requestHandler = function(request, response) {

  var urlObject = url.parse( request.url );
  var headers = defaultCorsHeaders;
  
  if (request.method === 'OPTIONS' && urlObject.pathname === '/classes/messages' ) {

    headers['Content-Type'] = 'application/json';
    response.writeHead(200, headers);
    response.end('Allow: HEAD, GET, POST, OPTIONS');
    console.log('OPTIONS Request', urlObject.pathname);

  } else if (request.method === 'GET' && urlObject.pathname === '/classes/messages') {

    console.log('GET Request', urlObject.pathname);
    
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
    
    console.log('POST Request', urlObject.pathname);

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

    console.log('404 Not Found!', urlObject.pathname);
    
    response.writeHead(404, headers);
    response.end();


  } 

};

exports.requestHandler = requestHandler;
