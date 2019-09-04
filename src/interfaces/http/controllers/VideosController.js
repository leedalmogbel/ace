const { Router } = require('express');
const { BaseController } = require('@brewery/core');

class VideosController extends BaseController {
  
  constructor() {
    super();
    const router = Router();
    // Video
    router.get('/:id/video', this.injector('ListVideo'), this.index);
    router.post('/:id/video', this.injector('CreateVideo'), this.create);

    return router;
  }
}

module.exports = VideosController;
