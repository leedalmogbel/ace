require('module').Module._initPaths();
const { Lifetime, asClass} = require('awilix');
const { brew } = require('@amberjs/core');
const config = require('config');
const ThirdPartyApis = require('src/infra/services/ThirdPartyApis');

module.exports.handler = (event, context, callback) => {
  brew(config, async (err, brewed) => {
    if (err) throw err;
    brewed.container.register({
      ThirdPartyApis: asClass(ThirdPartyApis, {
        lifetime: Lifetime.SINGLETON
      })
    });
    const app = brewed.getServerless();
    try {
      const res = await app(event, context);
      callback(null, res);
    } catch (err) {
      callback(err);
    }
  });
};