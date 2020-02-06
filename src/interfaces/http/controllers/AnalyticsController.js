const { Router } = require('express');
const { BaseController } = require('@amberjs/core');
const Status = require('http-status');

class AnalyticsController extends BaseController {
  
  constructor() {
    super();
    const router = Router();

    router.get('/match', this.injector('MatchReport'), this.index);
    router.get('/progress', this.injector('ProgressReport'), this.index);
    
    return router;
  }

  index(req, res, next) {
    const { operation } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.OK)
          .json(result);
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(ERROR, next);
    operation.execute(req.query);
  }

}

module.exports = AnalyticsController;
