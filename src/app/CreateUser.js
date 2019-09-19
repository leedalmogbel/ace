const { Operation } = require('@brewery/core');
const User = require('src/domain/User');
const Utils = require('src/interfaces/http/utils/utils.js');
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
      if (user.isAdminAuthenticate() == 0) {
        user.isAdminAuthenticate(), 'Not an Admin!';
        
      } else {
        user.isAdminAuthenticate();
      }
      const newUser = await this.UserRepository.insertEmail(user);
      const data = (data) => {
        return {
          data: data[0],
        };
      };
      this.emit(SUCCESS, data(newUser));
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
