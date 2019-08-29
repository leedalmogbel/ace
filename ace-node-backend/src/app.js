const { brew } = require('@brewery/core');
const config = require('config');

const { server, container } = brew(config);

server
  .start()
  .catch((error) => {
    server.logger.error(error.stack);
    process.exit();
  });

module.exports = container;