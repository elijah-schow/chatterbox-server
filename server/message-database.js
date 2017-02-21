var random = require('randomstring');

var _data = [ 
  // { 
  //   createdAt: '2017-02-20T17:41:38.634Z',
  //   objectId: 'LioZsqlCvs',
  //   roomname: 'lobby',
  //   text: 'Hello, world!',
  //   username: 'Jane Doe',
  //   updatedAt: '2017-02-20T17:41:38.634Z'
  // },
];

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