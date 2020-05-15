const { Operation } = require('@amberjs/core');
const {Persons} = require('src/domain/DetectedPerson');

class CreateDetectedPersons extends Operation {
  constructor({ ClipPersonRepository, ClipRepository, logger }) {
    super();
    this.ClipPersonRepository = ClipPersonRepository;
    this.ClipRepository = ClipRepository;
    this.logger = logger;
  }

  async execute(clipId, data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const persons = new Persons({...data});
    const { valid, errors } = persons.validate(data);
    if (!valid) {
        return this.emit(VALIDATION_ERROR, errors);
    }

    try {
      // update clip status to 'success' before saving dtected persons;
      this.ClipRepository.update(clipId, {status:'success'});
      //this.logger.info(`CreateDetectedPersons; Data from AI Extraction : ${JSON.stringify(persons)}`);
      this.logger.info(`CreateDetectedPersons; Data from AI Extraction`);
      await this.ClipPersonRepository.addMultiple(data);

      return this.emit(SUCCESS, {
          "statusCode" : 201,
          "message" : "Successfully Created"
      });
    } catch(error) {
        console.log('CreateDetectedPersons ERROR', error);
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      return this.emit(ERROR, error);
    }
  }
}

CreateDetectedPersons.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateDetectedPersons;
