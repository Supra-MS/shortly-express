const _ = require('underscore');

const parseCookies = (req, res, next) => {
  if (req.headers.cookie) {
    var  keyValueArray = req.headers.cookie.split(';');
     var object =_.reduce(keyValueArray, (accumulator, value) => {
      var currKeyValueArr = value.trim().split('=');
      accumulator[currKeyValueArr[0]] = currKeyValueArr[1];
      return accumulator
    }, {});

    console.log('Parsed object: ', object);
    req.cookies = object;
  } else {
    req.cookies = {};
  }
  next();
};

module.exports = parseCookies;
