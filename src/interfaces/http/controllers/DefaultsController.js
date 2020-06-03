const { Router } = require('express');
const { BaseController } = require('@amberjs/core');
const Status = require('http-status');

class DefaultsController extends BaseController {
  
  constructor() {
    super();
    const router = Router();
    // Video
    router.get('/', this.injector('ListDefaults'), this.showList);

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

    operation.execute(req.query);
  }
}

module.exports = DefaultsController;
