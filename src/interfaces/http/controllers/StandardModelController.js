const { Router } = require('express');
const { BaseController } = require('@amberjs/core');
const Status = require('http-status');

class StandardModelController extends BaseController {
  
  constructor() {
    super();
    const router = Router();

    // Gold Scenarios
    router.get('/', this.injector('ListModels'), this.getWithParams);
    router.post('/', this.injector('TrainModel'), this.create);
    
    return router;
  }

  getWithParams(req, res, next) {
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

module.exports = StandardModelController;
