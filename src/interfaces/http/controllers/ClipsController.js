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
    router.get('/:id', this.injector('ShowClip'), this.show);
    router.put('/:id', this.injector('UpdateClip'), this.update);
    router.delete('/:id', this.injector('DeleteClip'), this.delete);

    router.get('/keypoint/list', this.injector('ListKeypoints'), this.index);
    router.get('/keypoint', this.injector('GetKeypoint'), this.showList);
    router.post('/keypoint', this.injector('KeypointSignedURL'), this.create);

    //Filter
    router.get('/video/details/filter', this.injector('GetFilter'), this.showFilter);
    router.get('/filter', this.injector('ClipFilter'), this.showFilter);
    router.get('/countfilter', this.injector('ListFilteredClips'), this.showFilter);

    // Get List of Detected Persons
    router.get('/:id/detectedPerson', this.injector('ListDetectedPersons'), this.show);
    router.post('/:id/detectedPerson', this.injector('CreateDetectedPersons'), this.createPerson);
    router.get('/:id/detect-persons', this.injector('DetectPersons'), this.show);
    //router.put('/:clipId/detectedPerson:id', this.injector('UpdateDetectedPersons'), this.update);

    router.post('/:clipId/detectedPerson/:id/setKeypoints', this.injector('SetDetectedPersonKeypoints'), this.showPersonKeypoints);

    // signedURL for detectedPerson
    router.post('/:clipId/detectedPerson/:id/generateKeypointsSignedUrl', this.injector('GenerateKeypointsSignedUrl'), this.showPersonKeypoints);
    router.post('/:clipId/detectedPerson/:id/generateVideoSignedUrl', this.injector('GenerateVideoSignedUrl'), this.showPersonKeypoints);
    
    // select clip for scoring
    router.post('/:clipId/detectedPerson/:id/generateScore', this.injector('GenerateDetectedPersonScore'), this.showDetectedPerson);
    router.get('/:clipId/detectedPerson/:id/scores', this.injector('ShowDetectedPersonScore'), this.showPersonScores);
    router.post('/:clipId/detectedPerson/:id/scores', this.injector('CreateScore'), this.showPersonKeypoints);

    
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

  showPersonKeypoints(req, res, next) {
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
    body.clipId = Number(req.params.clipId);
    body.clipPersonId = Number(req.params.id);
    operation.execute(body);
  }

  showDetectedPerson(req, res, next) {
    const { operation } = req;

    const { SUCCESS, ERROR, NOT_FOUND, SERVICE_UNAVAILABLE, VALIDATION_ERROR } = operation.events;

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
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(SERVICE_UNAVAILABLE, (error) => {
        res.status(Status.SERVICE_UNAVAILABLE).json({
          type: 'Service Unavailable',
          details: error
        });
      })
      .on(ERROR, next);

    operation.execute(req.params, req.body);
  }


  showPersonScores(req, res, next) {
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
    operation.execute(req.params);
  }
}

module.exports = ClipsController;
