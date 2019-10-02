const { Router } = require('express');
const { BaseController } = require('@amberjs/core');

class VideosController extends BaseController {
  
  constructor() {
    super();
    const router = Router();
    // Video
    router.get('/:userId/video', this.injector('ListVideo'), this.index);
    router.post('/:userId/video', this.injector('CreateVideo'), this.create);

    router.post('/getSignedURL', this.injector('GetSignedURL'), this.create);

    return router;
  }

  
}

module.exports = VideosController;
