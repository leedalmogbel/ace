const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');

class ListUsers extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.events;

    try {
      const users = await this.UserRepository.getAll({});
      const data = Utils().resSuccess(users);
      this.emit(SUCCESS, data);
    } catch(error) {
      const dataError = Utils().resError(error);
      this.emit(ERROR, dataError);
    }
  }
}

ListUsers.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListUsers;
    
