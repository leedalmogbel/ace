const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');

class ListPersonKeypoints extends Operation {
  constructor({ PersonKeypointRepository }) {
    super();
    this.PersonKeypointRepository = PersonKeypointRepository;
  }

  async execute(params) {
    const { SUCCESS, ERROR } = this.events;

    try {
      const users = await this.PersonKeypointRepository.getAll({
        where : params,
        attributes: ['id', 'scenarioId', 'keypointLink']
      });

      const data = Utils().resSuccess(users);
      return this.emit(SUCCESS, data);
    } catch(error) {
      const dataError = Utils().resError(error);
      return this.emit(ERROR, dataError);
    }
  }
}

ListPersonKeypoints.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListPersonKeypoints;
    
