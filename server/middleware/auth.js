const { Users, Sessions, Clicks, Links } = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  var cookieSessionId = req.cookies.shortlyid;
  if (!cookieSessionId) {
    createCookie(req, res, next);

  } else {
    return Sessions.get({hash: cookieSessionId})
      .then((sessionInfo) => {
        if (sessionInfo) {
          req.session = sessionInfo;
          next();
        } else {
          res.clearCookie('shortlyid');
          createCookie(req, res, next);
        }
      });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.verifySession = (req, res, next) => {
  console.log('req.session ***', req.session);
  if (Sessions.isLoggedIn(req.session)) {
    console.log('req.session logged in req.session', req.session);
    next();
  } else {
    console.log('req.session logged out req.session', res.session);
    res.redirect('/login');
    res.end();
  }
};


function createCookie(req,res,next) {
  Sessions.create()
    .then((result) => {
      return Sessions.get({ id: result.insertId });
    })
    .then((sessionInfo) => {
      req.session = sessionInfo;
      res.cookie('shortlyid', sessionInfo.hash);
      next();
    })
    .catch((err) => {
      console.error(err);
      next();
    });
}