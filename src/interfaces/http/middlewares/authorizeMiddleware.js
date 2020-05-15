const Status = require('http-status');
const jwtDecode = require('jwt-decode');
const { asValue } = require('awilix');

const authorizeMiddleware = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(Status.UNAUTHORIZED).json({
      type: 'Unauthorized',
      details: [{
        message: 'Unauthorized'
      }]
    });
  }
  
  let decodedAuth = jwtDecode(req.headers['authorization']);
  let curEpoch = Math.round(Date.now()/1000);
  let tokenExp = decodedAuth.exp;
  let cognitoAppId = decodedAuth.aud;

  if(curEpoch > tokenExp || cognitoAppId != process.env.COGNITO_CLIENT_ID){
    return res.status(Status.UNAUTHORIZED).json({
      type: 'Unauthorized',
      details: [{
        message: 'Invalid token.'
      }]
    });
  }

  let params = {
    email : decodedAuth.email,
    name : decodedAuth.name,
    providerId : decodedAuth.identities[0].userId,
    provider: decodedAuth.identities[0].providerName,
  };


  const authorize = req.container.resolve('Register');
  const { SUCCESS, ERROR, VALIDATION_ERROR } = authorize.events;

  authorize
    .on(SUCCESS, (result) => {
      req.container.register({ 
        sessionUser: asValue(result)
      });
      next();
    })
    .on(VALIDATION_ERROR, (error) => {
      res.status(Status.BAD_REQUEST).json({
        type: 'ValidationError',
        details: error.details
      });
    })
    .on(ERROR, next);

  authorize.execute(params);

  // const register = req.container.resolve('Register');
  // const { SUCCESS, ERROR } = authorize.events;

  // register
  //   .on(SUCCESS, (result) => {
  //     req.container.register({ 
  //       sessionUser: asValue(result)
  //     });
  //     next();
  //   })
  //   .on(ERROR, next);

  // register.execute(email);
   
};

module.exports = authorizeMiddleware;