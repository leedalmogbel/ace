const { Operation } = require('@amberjs/core');

class DeleteClip extends Operation {
  constructor({ ClipRepository }) {
    super();
    this.ClipRepository = ClipRepository;
  }

  async execute(id) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.events;

    try {
      await this.ClipRepository.remove(id);
      const message = {
        message: 'Clip DELETED'
      };
      return this.emit(SUCCESS, message);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }

      return this.emit(ERROR, error);
    }
  }
}

DeleteClip.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = DeleteClip;
