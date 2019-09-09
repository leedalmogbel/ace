const { Operation } = require('@brewery/core');
const Coach = require('src/domain/Coach');

class CreateCoach extends Operation {
  constructor({ CoachesRepository }) {
    super();
    this.CoachesRepository = CoachesRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const coach = new Coach(data);

    try {
      const newUser = await this.CoachesRepository.add(coach);
      
      this.emit(SUCCESS, newUser);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateCoach.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateCoach;
