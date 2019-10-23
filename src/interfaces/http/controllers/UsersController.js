const { Router } = require('express');
const { BaseController } = require('@amberjs/core');
const Status = require('http-status');

class UsersController extends BaseController {
  
  constructor() {
    super();
    const router = Router();

    // User
    router.get('/list', this.injector('ListUsers'), this.index);
    router.post('/signin', this.injector('CreateUser'), this.create);
    router.get('/:id', this.injector('ShowUser'), this.show);
    router.put('/:id', this.injector('UpdateUser'), this.update);
    router.delete('/:id', this.injector('DeleteUser'), this.delete);
    // router.get('/auth-token', requestToken);
    
    //Coach
    router.get('/coach/list', this.injector('ListCoaches'), this.index);

    //Filter
    router.get('/details/filter', this.injector('GetFilter'), this.showList);
    
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
}

module.exports = UsersController;
