const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');

class ShowClip extends Operation {
  constructor({ ClipRepository }) {
    super();
    this.ClipRepository = ClipRepository;
  }

  async execute(userId) {
    const { SUCCESS, NOT_FOUND } = this.events;

    try {
      const user = await this.ClipRepository.getById(userId);
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

ShowClip.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ShowClip;
    
