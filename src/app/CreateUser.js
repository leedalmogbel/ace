const { Operation } = require('@brewery/core');
const User = require('src/domain/User');
const Utils = require('src/infra/services/utils.js');
// const Coach = require('src/domain/Coach');

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
      const message = 'Successful Signin';
      const newUser = await this.UserRepository.createEmail(user);
      const data = (data, message) => {
        return {
          statusCode: 200,
          data: data[0],
          message
        };
      };
      this.emit(SUCCESS, data(newUser, message));
    } catch(error) {
      const dataError = Utils().resError(error);
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, dataError, error.message);
      }

      this.emit(ERROR, dataError, error.message);
    }

    // this.CoachesRepository.createCoach({id: req.params.id}, res, next)
    //   const coach = new Coach(id, res);
    //   try {
    //     coach.isAdminAuthenticate();
    //     const newCoach = await this.CoachesRepository.add(coach);
        
    //     this.emit(SUCCESS, newCoach);
    //   } catch(error) {
    //     if(error.message === 'ValidationError') {
    //       return this.emit(VALIDATION_ERROR, error);
    //     }
  
    //     this.emit(ERROR, error);
    //   }
    
  }
}

CreateUser.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateUser;
