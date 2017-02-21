var qs = require('qs');
var random = require('randomstring');
var url = require('url');
var messages = require('./message-database.js');
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
