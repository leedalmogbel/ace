const Status = require('http-status');
const jwtDecode = require('jwt-decode');

const authorizeMiddleware = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(Status.UNAUTHORIZED).json({
      type: 'Unauthorized',
      details: [{
        message: 'Unauthorized'
      }]
    });
  }

  let curEpoch = Math.round(Date.now()/1000);
  let tokenExp = jwtDecode(req.headers['authorization']).exp;

  if(curEpoch > tokenExp){
    return res.status(Status.UNAUTHORIZED).json({
      type: 'Unauthorized',
      details: [{
        message: 'Unauthorized'
      }]
    });
  }else{
    next();
  }
   
};

module.exports = authorizeMiddleware;