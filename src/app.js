require('module').Module._initPaths();
const { brew } = require('@brewery/core');
const config = require('config');
const serverless = require('serverless-http');

console.log(config);
const { server, container } = brew(config);

console.log(config);
if(!config.app.serverless) {
  server
    .start()
    .catch((error) => {
      server.logger.error(error.stack);
      process.exit();
    });
    console.log(config);
} else {
  module.exports.serverless = serverless(server.express);
}

module.exports.container = container;