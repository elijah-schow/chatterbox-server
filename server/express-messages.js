var randomstring = require('randomstring');

_data = [];

function get() {
  return _data;
}

function post(data) {
  var objectId = randomstring.generate(16);
  var createdAt = new Date();
  _data.unshift({
    'objectId': objectId,
    'username': decodeURI(data.username),
    'text': decodeURI(data.text),
    'roomname': decodeURI(data.roomname) || 'lobby',
    'createdAt': createdAt
  });
  return {
    'objectId': objectId,
    'createdAt': createdAt
  };
}

exports.get = get;
exports.post = post;
