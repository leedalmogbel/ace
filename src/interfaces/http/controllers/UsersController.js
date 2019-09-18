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
    
    //Coach
    router.get('/coach', this.injector('ListCoaches'), this.index);

    return router;
  }
}

module.exports = UsersController;
