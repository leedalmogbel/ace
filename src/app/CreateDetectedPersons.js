const { Operation } = require('@amberjs/core');
const {Persons} = require('src/domain/DetectedPerson');

class CreateDetectedPersons extends Operation {
  constructor({ ClipPersonRepository }) {
    super();
    this.ClipPersonRepository = ClipPersonRepository;
  }

  async execute(clipId, data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const persons = new Persons({...data});

    const { valid, errors } = persons.validate(data);
    if (!valid) {
        return this.emit(VALIDATION_ERROR, errors);
    }

    try {
      await this.ClipPersonRepository.addMultiple(clipId, persons);
      
      return this.emit(SUCCESS, {
          "statusCode" : 201,
          "message" : "Successfully Created"
      });
    } catch(error) {
        console.log('ERROR', error);
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      return this.emit(ERROR, error);
    }
  }
}

CreateDetectedPersons.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateDetectedPersons;
