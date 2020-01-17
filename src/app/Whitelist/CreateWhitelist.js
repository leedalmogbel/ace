const { Operation } = require('@amberjs/core');
const Whitelist = require('src/domain/Whitelist');

class CreateWhitelist extends Operation {
  constructor({ WhitelistRepository }) {
    super();
    this.WhitelistRepository = WhitelistRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const whitelistedEmail = new Whitelist(data);
    const { valid, errors } = whitelistedEmail.validate(data);

    if (!valid) {
      return this.emit(VALIDATION_ERROR, {
        details: {errors:errors}
      });
    }
    try {
      const newWhitelistedEmail = await this.WhitelistRepository.add(whitelistedEmail);
      
      return this.emit(SUCCESS, {
        details : {
          message : 'Successfully created.',
          data : newWhitelistedEmail
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

CreateWhitelist.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateWhitelist;
