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

    //Filter
    router.get('/video/details/filter', this.injector('GetFilter'), this.showFilter);
    router.get('/countfilter', this.injector('ListFilteredClips'), this.showFilter);

    //Set Gold Standard
    router.put('/:id/setStandard', this.injector('SetGoldStandard'), this.update);

    // Get List of Detected Persons
    router.get('/:id/detectedPerson', this.injector('ListDetectedPersons'), this.show);
    router.post('/:id/detectedPerson', this.injector('CreateDetectedPersons'), this.createPerson);

    router.put('/:clipId/detectedPerson/:id/setKeypoints', this.injector('SetDetectedPersonKeypoints'), this.update);

    // signedURL for detectedPerson
    router.get('/:clipId/detectedPerson/:id/generateKeypointsSignedUrl', this.injector('GenerateKeypointsSignedUrl'), this.showSignedUrl);
    router.get('/:clipId/detectedPerson/:id/generateVideoSignedUrl', this.injector('GenerateVideoSignedUrl'), this.showSignedUrl);
    
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

    operation.execute(Number(req.query.clipId)||Number(req.query.videoId)||req.query, req.body);
  }

  showFilter(req, res, next) {
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

  createPerson(req, res, next) {
    const { operation } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.CREATED)
          .json(result);
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(ERROR, next);
    operation.execute(Number(req.params.id), req.body);
  }

  showSignedUrl(req, res, next) {
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
    operation.execute(Number(req.params.clipId), Number(req.params.id));
  }
}

module.exports = ClipsController;
