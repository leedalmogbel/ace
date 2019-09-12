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