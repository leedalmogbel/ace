const { brew } = require('@brewery/core');
const config = require('config');
const serverless = require('serverless-http');

const { server, container } = brew(config);

server
  .start()
  .catch((error) => {
    server.logger.error(error.stack);
    process.exit();
  });

// module.exports.serverless = serverless(server.express);

// module.exports.CreateUser = async (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false;
//   const parameters = event.queryStringParameters;

//   const userFormat = params =>({
//     name: params.name,
//     email: params.email,
//     userType: params.userType,
//     isAdmin: params.isAdmin
//   });

//   const coachFormat = params => ({
//     userId: params.id
//   });

//   try {
//     const newUser = new CreateUser({ UserRepository });
//     return results = await newUser.userFormat(parameters);

//   } catch (err) {
//     console.log(err);
//   }
// }

module.exports = container;