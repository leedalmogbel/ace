const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');

class ShowUser extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(userId) {
    const { SUCCESS, NOT_FOUND } = this.events;

    try {
      const user = await this.UserRepository.getById(userId);
      const data = Utils().resSuccess(user);
      return this.emit(SUCCESS, data);
    } catch(error) {
      return this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

ShowUser.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ShowUser;
    
