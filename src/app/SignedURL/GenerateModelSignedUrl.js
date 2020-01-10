const { Operation } = require('@amberjs/core');
const signURL = require('src/infra/services/signedUrl');

class GenerateModelSignedUrl extends Operation {
  constructor({ ThirdPartyApis, ClipRepository, StandardModelRepository }) {
    super();
    this.ThirdPartyApis = ThirdPartyApis;
    this.ClipRepository = ClipRepository;
    this.StandardModelRepository = StandardModelRepository;
  }
 
  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const key = `models/${process.env.NODE_ENV}/${data.userId}/${data.scenarioId}/${String(Date.now())}.h5`.replace(/\s/g, '');
    const generatedData = signURL.generateSignedUrlForModel(key);
    try {
      console.log('GenerateModelSignedURL : ', generatedData.pathURL);
      // ADD TO NEW TABLE OR UPDATE standardModel table

      let result = await this.StandardModelRepository.upsert({'userId': data.userId, 'scenarioId': data.scenarioId, 'modelLink':generatedData.pathURL});
      console.log('GenerateModelSignedURL upsert : ', result);
      return this.emit(SUCCESS, generatedData);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

GenerateModelSignedUrl.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = GenerateModelSignedUrl;
