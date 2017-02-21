var randomstring = require('randomstring');

_data = [
  {
    'objectId': randomstring.generate(16),
    'username': "Bob",
    'text': "This is a message!",
    'roomname': "lobby",
    'createdAt': new Date()
  },
  {
    'objectId': randomstring.generate(16),
    'username': "HAL-9000",
    'text': "Hello, World",
    'roomname': "lobby",
    'createdAt': new Date()
  },
  {
    'objectId': randomstring.generate(16),
    'username': "SERVER",
    'text': "Welcome to the express server!",
    'roomname': "lobby",
    'createdAt': new Date()
  }
];

function get() {
  return _data;
}

function post(data) {
  var objectId = randomstring.generate(16);
  var createdAt = new Date();
  _data.push({
    'objectId': objectId,
    'username': data.username,
    'text': data.text,
    'roomname': data.roomname || 'lobby',
    'createdAt': createdAt
  });
  return {
    'objectId': objectId,
    'createdAt': createdAt
  };
}

exports.get = get;
exports.post = post;
