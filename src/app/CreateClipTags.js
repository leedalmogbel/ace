const { Operation } = require('@brewery/core');

class CreateClipTags extends Operation {
  constructor({ }) {
    super();
  }

  async execute(data) {
    /**
     * Implement service/usecase logic here. eg:
     * 
     * const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.events;
     * 
     * const user = new User(data);
     *
     *  try {
     *     const newUser = await this.UserRepository.add(user);
     *
     *     this.emit(SUCCESS, newUser);
     *   } catch(error) {
     *     if(error.message === 'ValidationError') {
     *       return this.emit(VALIDATION_ERROR, error);
     *     }
     *     this.emit(ERROR, error);
     *   }
     */
  }
}

CreateClipTags.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateClipTags;
