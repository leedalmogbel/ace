require('module').Module._initPaths();
const { Lifetime, asClass} = require('awilix');
const { brew } = require('@amberjs/core');
const config = require('config');
const ThirdPartyApis = require('src/infra/services/ThirdPartyApis');

brew(config, (err, brewed) => {
  if (err) throw err;
  brewed.container.register({
    ThirdPartyApis: asClass(ThirdPartyApis, {
      lifetime: Lifetime.SINGLETON
    })
  });
  const app = brewed.getServer();
  app.start().catch(error => {
    app.logger.error(error.stack);
    process.exit();
  });
});


