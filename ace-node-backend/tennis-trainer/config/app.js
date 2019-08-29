require('dotenv').load();

module.exports = {
  /**
   * The name of the application
   */
  name: 'node-api-boilerplate',
  /**
   * The default environment
   */
  env: process.env.NODE_ENV,
  /**
   * Default debug settings
   */
  debug: process.env.DEBUG,
  /**
   * port if funs on server
   */
  port: process.env.PORT,
  /**
   * Source directory of resources to be autoloaded
   */
  sources: { 
    domain: ['src/domain'],
    app: ['src/app'],
    dataSource: ['src/infra/dataSources'],
    model: ['src/infra/models'],
    repository: ['src/infra/repositories'],
    middleware: ['src/interfaces/http/middlewares'],
    router: 'src/interfaces/http/router.js'
  },
};
