const { Router, static } = require('express');
const statusMonitor = require('express-status-monitor');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const controller = require('./utils/createControllerRoutes');
const path = require('path');
const openApiDoc = require('./openApi.json');

module.exports = ({ config, containerMiddleware, loggerMiddleware, errorHandler, openApiMiddleware, authorizeMiddleware }) => {
  const router = Router();
  router.use(containerMiddleware);

  /* istanbul ignore if */
  if(config.app.env === 'development') {
    router.use(statusMonitor());
  }


  /* istanbul ignore if */
  if(config.app.env !== 'test') {
    router.use(loggerMiddleware);
  }
 
  const apiRouter = Router();
  
  apiRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(cors())
    .use(bodyParser.json({limit: '1000mb', extended: true}))
    .use(compression())
    .use('/docs', openApiMiddleware(openApiDoc));

  /*
   * Add your API routes here
   *
   * You can use the `controllers` helper like this:
   * apiRouter.use('/users', controller(controllerPath))
   *
   * The `controllerPath` is relative to the `interfaces/http` folder
   * Avoid hardcoding in this file as much. Deleting comments in this file
   * may cause errors on scaffoldings
   */

  apiRouter.use('/users', authorizeMiddleware, controller('controllers/UsersController'));
  apiRouter.use('/videos', authorizeMiddleware, controller('controllers/VideosController'));
  apiRouter.use('/clips', authorizeMiddleware, controller('controllers/ClipsController'));
  apiRouter.use('/scenarios', authorizeMiddleware, controller('controllers/ScenariosController'));
  apiRouter.use('/models', authorizeMiddleware, controller('controllers/StandardModelController'));
  apiRouter.use('/analytics', authorizeMiddleware, controller('controllers/AnalyticsController'));
  apiRouter.use('/detectedPerson', authorizeMiddleware, controller('controllers/DetectedPersonController'));
  apiRouter.use('/public/clips', controller('controllers/ClipsController'));
  /* apiRoutes END */


  router.use('/api', apiRouter);
  router.use('/', static(path.join(__dirname, './public')));

  router.use(errorHandler);

  return router;
};
