var random = require('randomstring');

var _data = [];

var get = function() {
  return _data;
};

var post = function(message) {
  _data.push({
    createdAt: new Date(),
    objectId: random.generate(16),
    message: message.message,
    text: message.text,
    username: message.username,
    roomname: message.roomname || 'lobby'
  });

};

exports.get = get;
exports.post = post;
