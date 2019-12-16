const { Operation } = require('@amberjs/core');

class DeleteUser extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(id) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.events;

    try {
      await this.UserRepository.remove(id);
      const message = {
        message: 'User DELETED'
      };
      return this.emit(SUCCESS, message);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }

      return this.emit(ERROR, error);
    }
  }
}

DeleteUser.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = DeleteUser;
    
