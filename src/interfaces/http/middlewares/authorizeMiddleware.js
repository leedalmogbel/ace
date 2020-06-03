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
  let cognitoAppId;
  if(decodedAuth.aud){
    cognitoAppId = decodedAuth.aud;
  }else if(decodedAuth.client_id){
    if(decodedAuth.client_id == process.env.COGNITO_AI_CLIENT_ID) 
      cognitoAppId = decodedAuth.client_id;
  }
  let cognitoAppIdArr = [process.env.COGNITO_CLIENT_ID, process.env.COGNITO_AI_CLIENT_ID];
  
  if(!(tokenExp > curEpoch && cognitoAppIdArr.includes(cognitoAppId))){
    return res.status(Status.UNAUTHORIZED).json({
      type: 'Unauthorized',
      details: [{
        message: 'Invalid token.'
      }]
    });
  }

  let params = {
    cognitoAppId: cognitoAppId
  };

  if(cognitoAppId == process.env.COGNITO_CLIENT_ID){
    params = {
      cognitoAppId: cognitoAppId,
      email : decodedAuth.email,
      name : decodedAuth.name, //should update to name
      providerId : decodedAuth.identities[0].userId,
      provider: decodedAuth.identities[0].providerName
    };
  }


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

   
};

module.exports = authorizeMiddleware;