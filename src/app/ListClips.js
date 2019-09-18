const { Operation } = require('@brewery/core');

class ListClips extends Operation {
  constructor({ ClipRepository }) {
    super();
    this.ClipRepository = ClipRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.events;

    try {
      const clips = await this.ClipRepository.getAll({});

      this.emit(SUCCESS, clips);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

ListClips.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListClips;
    
