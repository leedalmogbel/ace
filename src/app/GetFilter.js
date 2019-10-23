const { Operation } = require('@amberjs/core');
const Utils = require('../infra/services/utils');

class GetFilter extends Operation {
  constructor({ FilterRepository }) {
    super();
    this.FilterRepository = FilterRepository;
  }

  async execute(data) {
    const { SUCCESS, NOT_FOUND } = this.events;
    console.log(data);
    try {
      const filtered = await this.FilterRepository.getByFilter(data);
      const newData = Utils().resSuccess(filtered);
      return this.emit(SUCCESS, newData);
    } catch(error) {
      return this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetFilter.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = GetFilter;
