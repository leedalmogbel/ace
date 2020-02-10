const { Router } = require('express');
const { BaseController } = require('@amberjs/core');
const Status = require('http-status');

class ScenariosController extends BaseController {
  
  constructor() {
    super();
    const router = Router();

    // Gold Scenarios
    router.get('/', this.injector('ListScenarios'), this.index);
    router.post('/', this.injector('CreateScenario'), this.create);
    router.get('/:id/keypoints', this.injector('ListPersonKeypoints'), this.getWithParams);
    router.post('/:id/generateModelSignedUrl', this.injector('GenerateModelSignedUrl'), this.getBody);
    return router;
  }

  getBody(req, res, next) {
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

    let body = req.body;
    body.scenarioId = Number(req.params.id);

    operation.execute(body);
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
    let body = req.query;
    body.scenarioId = Number(req.params.id);
    operation.execute(body);
  }

}

module.exports = ScenariosController;