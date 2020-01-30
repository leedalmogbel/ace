const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');

class ListCoaches extends Operation {
  constructor({ CoachesRepository }) {
    super();
    this.CoachesRepository = CoachesRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.events;

    try {
      const coaches = await this.CoachesRepository.getAll({});
      const data = Utils().resSuccess(coaches);
      return this.emit(SUCCESS, data);
    } catch(error) {
      const dataError = Utils().resError(error);
      return this.emit(ERROR, dataError);
    }
  }
}

ListCoaches.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListCoaches;
    
