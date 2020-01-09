const { Router } = require('express');
const { BaseController } = require('@amberjs/core');

class StandardModelController extends BaseController {
  
  constructor() {
    super();
    const router = Router();

    // Gold Scenarios
    router.get('/', this.injector('ListModels'), this.index);
    router.post('/', this.injector('TrainModel'), this.create);
    
    return router;
  }

}

module.exports = StandardModelController;
