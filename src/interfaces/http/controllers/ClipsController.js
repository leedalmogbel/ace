const { Router } = require('express');
const { BaseController } = require('@brewery/core');

class ClipsController extends BaseController {
  
  constructor() {
    super();
    const router = Router();
    // Clip
    router.get('/video/:videoId/clip', this.injector('ListClips'), this.index);
    router.post('/video/:videoId/clip', this.injector('CreateClip'), this.create);

    return router;
  }
}

module.exports = ClipsController;
