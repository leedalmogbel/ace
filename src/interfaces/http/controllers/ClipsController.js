const { Router } = require('express');
const { BaseController } = require('@amberjs/core');
const Status = require('http-status');

class ClipsController extends BaseController {
  
  constructor() {
    super();
    const router = Router();
    // Clip
    router.get('/', this.injector('ListClips'), this.showList);
    router.post('/:videoId/clip', this.injector('CreateClip'), this.create);
    router.put('/update/:id', this.injector('UpdateClip'), this.update);
    router.delete('/delete/:id', this.injector('DeleteClip'), this.delete);

    router.get('/keypoint/list', this.injector('ListKeypoints'), this.index);
    router.get('/keypoint', this.injector('GetKeypoint'), this.showList);
    router.post('/keypoint', this.injector('KeypointSignedURL'), this.create);

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

    operation.execute(Number(req.query.clipId)||Number(req.query.videoId), req.body);
  }
}

module.exports = ClipsController;
