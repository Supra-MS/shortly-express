const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  console.log('CREATE SESSION IS BEING RUN');
  var cookieSessionId = req.cookies.shortlyid;
  if (!cookieSessionId) {
    models.Sessions.create()
      .then((result) => {
        console.log('RESULT', result);
        console.log('INSERTED ID', result.insertId);
        models.Sessions.get({id: result.insertId})
          .then((value) => {
            console.log('ID EQUAL INSERTED ID', value);
          })
      })
  }

  next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

