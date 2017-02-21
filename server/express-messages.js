// Modules
var randomstring = require('randomstring');
var fs = require('fs');

// Public API
exports.get = get;
exports.post = post;

// Setup
_data = [];
_path = './data/messages.json';
_load();

// Public Methods
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
  _save();
  return {
    'objectId': objectId,
    'createdAt': createdAt
  };
}

// Private methods
function _save() {
  data = JSON.stringify(_data);
  fs.writeFile(_path, data, function(err){
    if(err) {
      console.log('DATABASE FAILED TO SAVE\n', error);
    }
  });
}

function _load() {
  fs.readFile(_path, 'utf8', (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.log('No database file found.');
        return;
      } else {throw err;}
    }
    try {
      _data = JSON.parse(data);
    } catch(error){
      console.log('DATABASE FAILED TO LOAD\n', error);
    }

  });
}
