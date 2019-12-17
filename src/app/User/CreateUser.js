const { Operation } = require('@amberjs/core');
const User = require('src/domain/User');
const Utils = require('src/infra/services/utils.js');
const Coach = require('src/domain/Coach');
//const Player = require('src/domain/Player');

class CreateUser extends Operation {
  constructor({ UserRepository, CoachesRepository, PlayerRepository }) {
    super();
    this.UserRepository = UserRepository;
    this.CoachesRepository = CoachesRepository;
    this.PlayerRepository = PlayerRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const user = new User(data);
    try {
      const newUser = await this.UserRepository.findCreateUpdate(user);

      const newData = (data, message) => {
        return {
          statusCode: 200,
          data: data,
          message
        };
      };
      const message = {
        status: 'Successful Signin',
      };

      if (newUser[0] != 1) {
        const playerData = {
          userId: newUser.id,
        };
        await this.PlayerRepository.add(playerData);
        
        const coachData = {
          userId: newUser.id,
          coachName: newUser.name
        };

        if (data.userType === 'coach') {
          const coach = new Coach(coachData);
          await this.CoachesRepository.createCoach(coach);
        }
        return this.emit(SUCCESS, newData(newUser, message));
      } else {
        const [,usern ] = newUser;
        return this.emit(SUCCESS, newData(usern[0], message));
      }
    } catch(error) {
      const dataError = Utils().resError(error);
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, dataError, error.message);
      }

      return this.emit(ERROR, dataError, error.message);
    }    
  }
}

CreateUser.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateUser;
