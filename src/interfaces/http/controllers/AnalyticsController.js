const { Router } = require('express');
const { BaseController } = require('@amberjs/core');
const Status = require('http-status');

class AnalyticsController extends BaseController {
  
  constructor() {
    super();
    const router = Router();

    router.get('/match', this.injector('MatchReport'), this.index);
    
    return router;
  }
}

module.exports = AnalyticsController;
