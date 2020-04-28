const { Router } = require('express');
const { BaseController } = require('@amberjs/core');
const Status = require('http-status');

class UsersController extends BaseController {
  
  constructor() {
    super();
    const router = Router();

    // User
    router.get('/list', this.injector('ListUsers'), this.index);
    router.post('/', this.injector('CreateUser'), this.create);
    router.post('/signin', this.injector('Login'), this.login);
    router.get('/:id', this.injector('ShowUser'), this.show);
    router.put('/:id', this.injector('UpdateUser'), this.update);
    router.delete('/:id', this.injector('DeleteUser'), this.delete);
    // router.get('/auth-token', requestToken);

    // Users keypoints,models and scores
    router.delete('/:id/keypoints', this.injector('DeleteUserKeypoints'), this.delete);
    router.delete('/:id/scores', this.injector('DeleteUserScores'), this.delete);
    router.delete('/:id/models', this.injector('DeleteUserModels'), this.delete);
    
    //Coach
    router.get('/coach/list', this.injector('ListCoaches'), this.index);

    //Filter
    router.get('/details/filter', this.injector('GetFilter'), this.showList);
    
    //Whitelist emails
    router.post('/whitelist', this.injector('CreateWhitelist'), this.create);
    return router;
  }

  showList(req, res, next) {
    const { operation } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.OK)
          .json(result);
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    operation.execute(req.query, req.body);
  }

  login(req, res, next) {
    const { operation } = req;
    const { SUCCESS, VALIDATION_ERROR, ERROR } = operation.events;

    operation
      .on(SUCCESS, result => {
        res.status(Status.OK).json(result);
      })
      .on(VALIDATION_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(ERROR, next);

    operation.execute(req.body);
  }

  delete(req, res, next) {
    const { operation } = req;
    const { SUCCESS, ERROR,  NOT_FOUND, VALIDATION_ERROR } = operation.events;

    operation
      .on(SUCCESS, () => {
        res.status(Status.ACCEPTED).end();
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(VALIDATION_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(ERROR, next);

    operation.execute(Number(req.params.id));
  }
}

module.exports = UsersController;
