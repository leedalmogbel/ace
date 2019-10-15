const { Operation } = require('@amberjs/core');
const Utils = require('../infra/services/utils.js');

class ListKeypoints extends Operation {
  constructor({ KeypointRepository }) {
    super();
    this.KeypointRepository = KeypointRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.events;

    try {
      const keypoints = await this.KeypointRepository.getAll();
      const data = Utils().resSuccess(keypoints);
      return this.emit(SUCCESS, data);
    } catch(error) {
      const dataError = Utils().resError(error);
      return this.emit(ERROR, dataError);
    }
  }
}

ListKeypoints.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListKeypoints;
