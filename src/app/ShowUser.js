const { Operation } = require('@amberjs/core');
// const Utils = require('src/interfaces/http/utils/utils.js');

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
      this.emit(SUCCESS, data);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

ShowUser.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ShowUser;
    
