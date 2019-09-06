const { Operation } = require('@brewery/core');
const User = require('src/domain/User');
// const Coach = require('src/domain/Coach')

class CreateUser extends Operation {
  constructor({ UserRepository /*, CoachesRepository */ }) {
    super();
    this.UserRepository = UserRepository;
    // this.CoachesRepository = CoachesRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const user = new User(data);
    // const coach = new Coach(data)

    try {
      const newUser = await this.UserRepository.add(user);
      // const newCoach = await this.CoachesRepository.createCoach(coach);
      
      this.emit(SUCCESS, newUser  /*, newCoach*/);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateUser.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateUser;
