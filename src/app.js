require('module').Module._initPaths();
const { Lifetime, asClass, asValue} = require('awilix');
const { brew } = require('@amberjs/core');
const config = require('config');
const ThirdPartyApis = require('src/infra/services/ThirdPartyApis');
const AnalyticsService = require('src/infra/services/AnalyticsService');
const Utils = require('src/interfaces/http/utils');

brew(config, (err, brewed) => {
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
  const app = brewed.getServer();
  app.start().catch(error => {
    app.logger.error(error.stack);
    process.exit();
  });
});


