const { Router } = require('express');
const { BaseController } = require('@amberjs/core');

class ClipsController extends BaseController {
  
  constructor() {
    super();
    const router = Router();
    // Clip
    router.get('/video/:videoId/clip', this.injector('ListClips'), this.show);
    router.post('/video/:videoId/clip', this.injector('CreateClip'), this.create);

    return router;
  }
}

module.exports = ClipsController;
