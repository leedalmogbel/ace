const { Router } = require('express');
const { BaseController } = require('@amberjs/core');
const Status = require('http-status');

class VideosController extends BaseController {
  
  constructor() {
    super();
    const router = Router();
    // Video
    router.get('/:userId/video', this.injector('ListVideo'), this.showList);
    router.post('/:userId/video', this.injector('CreateVideo'), this.create);

    router.post('/getSignedURL', this.injector('GetSignedURL'), this.create);

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

    operation.execute(Number(req.params.userId), req.body);
  }  
}

module.exports = VideosController;
