const { Operation } = require('@amberjs/core');
const Utils = require('../infra/services/utils.js');

class ListCoaches extends Operation {
  constructor({ CoachesRepository }) {
    super();
    this.CoachesRepository = CoachesRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.events;
    console.log('test logging');

    try {
      const coaches = await this.CoachesRepository.getAll({});
      console.log(coaches);
      const data = Utils().resSuccess(coaches);
      this.emit(SUCCESS, data);
    } catch(error) {
      const dataError = Utils().resError(error);
      this.emit(ERROR, dataError);
    }
  }
}

ListCoaches.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListCoaches;
    
