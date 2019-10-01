require('module').Module._initPaths();
const { brew } = require('@amberjs/core');
const config = require('config');

module.exports.handler = (event, context, callback) => {
  brew(config, async (err, brewed) => {
    if (err) throw err;

    const app = brewed.getServerless();
    try {
      const res = await app(event, context);
      callback(null, res);
    } catch (err) {
      callback(err);
    }
  });
};


