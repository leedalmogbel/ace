const { Router } = require('express');
const { BaseController } = require('@brewery/core');

class UsersController extends BaseController {
  
  constructor() {
    super();
    const router = Router();
    // User
    router.get('/', this.injector('ListUsers'), this.index);
    router.post('/', this.injector('CreateUser'), this.create);
    router.get('/:id', this.injector('ShowUser'), this.show);
    router.put('/:id', this.injector('UpdateUser'), this.update);
    router.delete('/:id', this.injector('DeleteUser'), this.delete);
    
    // Video
    router.get('/:id/video', this.injector('ListVideo'), this.index);
    router.post('/:id/video', this.injector('CreateVideo'), this.create);

    return router;
  }
}

module.exports = UsersController;
