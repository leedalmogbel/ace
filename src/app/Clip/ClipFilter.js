const { Operation } = require('@amberjs/core');
class ClipFilter extends Operation {
  constructor({ ClipRepository }) {
    super();
    this.ClipRepository = ClipRepository;
  }

  async execute(data) {
    const { SUCCESS, NOT_FOUND } = this.events;
    try {
      const filtered = await this.ClipRepository.getAll({
        where: data,
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'clipType',
            'rallyLength'
          ]
        }
      });
      return this.emit(SUCCESS, {data:filtered});
    } catch(error) {
      return this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

ClipFilter.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ClipFilter;
