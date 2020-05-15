const { Operation } = require('@amberjs/core');
const {User} = require('src/domain/User');

class Register extends Operation {
  constructor({UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.events;
    let params = {
        ...data
    };

    switch (data.provider) {
        case 'Google':
            params.googleUserId = data.providerId;
            break;
        case 'Facebook':
            params.fbUserId = data.providerId;
            break;
    
        default:
            break;
    }
    
    const user = new User(params);
    const { valid, errors } = user.validate(params);
    if (!valid) {
      return this.emit(VALIDATION_ERROR, {
        details: {
          errors : errors
        }
      });
    }

    try {
      await this.UserRepository.upsert(user);
      let usersData = await this.UserRepository.getByEmail(data.email);
      return this.emit(SUCCESS, usersData.dataValues);
      
    } catch(error) {
      return this.emit(ERROR, {details: {errors:error.message}});
    }
     
  }
}

Register.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = Register;
