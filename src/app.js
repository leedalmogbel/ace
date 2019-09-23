require('module').Module._initPaths();
const { brew } = require('@brewery/core');
const config = require('config');
const serverless = require('serverless-http');

const { server, container } = brew(config);

if(!config.app.serverless) {
  server
    .start()
    .catch((error) => {
      server.logger.error(error.stack);
      process.exit();
    });
} else {
  module.exports.serverless = serverless(server.express);
}

module.exports.container = container;

// module.exports.awsservice = 

// module.exports.s3StreamsHandler = (event, context, callback) => {
//   const data = event.body;
//   const handler = container.resolve('HandleFilesUseCase');

//   const { SUCCESS, VALIDATION_ERROR} = handler.outputs
//   handler.on(SUCCESS, (result) => {
//     callback(null, result);
//   });
//   handler.on(VALIDATION_ERROR, (result) => {
//     callback(error);
//   });

//   handler.execute(data)

// };