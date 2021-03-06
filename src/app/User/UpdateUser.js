const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils');

class UpdateUser extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(id, data) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR
    } = this.events;
    console.log(id, data);

    try {
      const user = await this.UserRepository.subscribed(id, data);
      const message = 'Subscription Updated';
      const subscription = Utils().resSuccess(user[0], message);
      return this.emit(SUCCESS, subscription);
    } catch(error) {
      switch(error.message) {
      case 'ValidationError':
        return this.emit(VALIDATION_ERROR, error);
      case 'NotFoundError':
        return this.emit(NOT_FOUND, error);
      default:
        return this.emit(ERROR, error);
      }
    }
  }
}

UpdateUser.setEvents(['SUCCESS', 'NOT_FOUND', 'VALIDATION_ERROR', 'ERROR']);

module.exports = UpdateUser; 
    
