const { Operation } = require('@amberjs/core');

class ListCoaches extends Operation {
  constructor({ CoachesRepository }) {
    super();
    this.CoachesRepository = CoachesRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.events;

    try {
      const coaches = await this.CoachesRepository.findAllCoaches({});

      this.emit(SUCCESS, coaches);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

ListCoaches.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListCoaches;
    
