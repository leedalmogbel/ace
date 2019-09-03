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

module.exports = container;