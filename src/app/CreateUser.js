const { Operation } = require('@brewery/core');
const User = require('src/domain/User');
const Coach = require('src/domain/Coach')

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
      if (user.isAdminAuthenticate() == user.isCoach()) {
        console.log("It is a coach!");
        const newUser = await this.UserRepository.add(user);
      }
      
      this.emit(SUCCESS, newUser);
      
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
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
