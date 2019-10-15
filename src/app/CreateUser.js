const { Operation } = require('@amberjs/core');
const User = require('src/domain/User');
const Utils = require('../infra/services/utils.js');
const Coach = require('src/domain/Coach');

class CreateUser extends Operation {
  constructor({ UserRepository, CoachesRepository }) {
    super();
    this.UserRepository = UserRepository;
    this.CoachesRepository = CoachesRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const user = new User(data);

    try {
      const newUser = await this.UserRepository.createEmail(user);
      const coachData = {
        userId: newUser[0].id,
        coachName: newUser[0].name
      };
      
      if (data.userType === 'coach') {
        const coach = new Coach(coachData);
        await this.CoachesRepository.createCoach(coach);
      }
      const newData = (data, message) => {
        return {
          statusCode: 200,
          data: data[0],
          message
        };
      };
      const message = {
        status: 'Successful Signin',
      };
      this.emit(SUCCESS, newData(newUser, message));
    } catch(error) {
      const dataError = Utils().resError(error);
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, dataError, error.message);
      }

      this.emit(ERROR, dataError, error.message);
    }    
  }
}

CreateUser.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateUser;
