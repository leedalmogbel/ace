const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');

class ListDetectedPersons extends Operation {
  constructor({ ClipPersonRepository }) {
    super();
    this.ClipPersonRepository = ClipPersonRepository;
  }

  async execute(id) {
    const { SUCCESS, NOT_FOUND } = this.events;
    try {
      const detectedPersons = await this.ClipPersonRepository.getAllWithParams({'clipId': id});
      let data = {
        'statusCode' : 200,
        'message' : 'Processing'
      }
      if(detectedPersons.length){
        data = Utils().resSuccess(detectedPersons);
      }
      return this.emit(SUCCESS, data);
    } catch(error) {
      console.log('PERSON ERROR : ', error);
      return this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

ListDetectedPersons.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListDetectedPersons;
    
