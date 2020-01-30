const { Operation } = require('@amberjs/core');
const User = require('src/domain/User');

class CreateUser extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    data.userType = data.userType.toLowerCase();
    const user = new User(data);
    const { valid, errors } = user.validate(data);

    if (!valid) {
      return this.emit(VALIDATION_ERROR, {
        details: {errors:errors}
      });
    }
    try {
      const newUser = await this.UserRepository.add(user);
      
      return this.emit(SUCCESS, {
        details : {
          message : 'Successfully created.',
          data : newUser
        }
      });
    } catch(error) {
      console.log('ERRROR : ', error);
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, {details: {errors:error.message}});
      }else if(error.name === 'SequelizeUniqueConstraintError') {
        return this.emit(VALIDATION_ERROR, {details: {
          errors: [
            {
              message: 'Email already exist.', 
              path: 'email'
            }
          ]
        }});
      }

      return this.emit(ERROR, {details: {errors:error.message}});
    }    
  }
}

CreateUser.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateUser;
