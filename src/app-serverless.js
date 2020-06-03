require('module').Module._initPaths();
const { Lifetime, asClass, asValue} = require('awilix');
const { brew } = require('@amberjs/core');
const config = require('config');
const ThirdPartyApis = require('src/infra/services/ThirdPartyApis');
const AnalyticsService = require('src/infra/services/AnalyticsService');
const Utils = require('src/interfaces/http/utils');

module.exports.handler = (event, context, callback) => {
  brew(config, async (err, brewed) => {
    if (err) throw err;
    brewed.container.register({
      ThirdPartyApis: asClass(ThirdPartyApis, {
        lifetime: Lifetime.SINGLETON
      }),
      AnalyticsService: asClass(AnalyticsService, {
        lifetime: Lifetime.SINGLETON
      }),
      Utils: asValue(Utils, {
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


module.exports.failedScenariosHandler = (event, context, callback) => {
  brew(config, async (err, brewed) => {
    if (err) throw err;
    brewed.container.register({
      ThirdPartyApis: asClass(ThirdPartyApis, {
        lifetime: Lifetime.SINGLETON
      })
    });
    const operation = brewed.container.resolve('RetryFailedScenarios');
    const { SUCCESS, ERROR } = operation.events;
    operation
      .on(SUCCESS, result => {
        callback(null, result);
      })
      .on(ERROR, err => {
        callback(err);
      });

    operation.execute();
  });
};