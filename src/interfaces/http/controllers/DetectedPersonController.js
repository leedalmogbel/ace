const { Router } = require('express');
const { BaseController } = require('@amberjs/core');
const Status = require('http-status');

class DetectedPersonController extends BaseController {
  
  constructor() {
    super();
    const router = Router();
    
    router.get('/:clipPersonId/keypointStatus', this.injector('GetKeypointStatus'), this.showList);
    router.post('/:clipPersonId/generateKeypoint', this.injector('GenerateKeypoints'), this.createList);

    
    return router;
  }

  showList(req, res, next) {
    const { operation } = req;

    const { SUCCESS, ERROR, NOT_FOUND, VALIDATION_ERROR } = operation.events;

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
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);
    operation.execute(Number(req.params.clipPersonId), req.query);
  }

  createList(req, res, next) {
    const { operation } = req;

    const { SUCCESS, ERROR, NOT_FOUND, VALIDATION_ERROR } = operation.events;

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
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);
    operation.execute(Number(req.params.clipPersonId), req.body);
  }

}

module.exports = DetectedPersonController;
