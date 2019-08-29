const path = require('path');
const devLogFile = path.join(__dirname, '../logs/development.log');
const prodLogFile = path.join(__dirname, '../logs/production.log');

module.exports = {
  development: {
    transports: [
      { transport: 'File', filename: devLogFile }
    ]
  },
  production: {
    transports: [
      { transport: 'File', filename: prodLogFile }
    ]
  }
};
