const { Operation } = require('@amberjs/core');
const signURL = require('src/infra/services/signedUrl');

class GenerateKeypointsSignedUrl extends Operation {
  constructor({ ClipPersonRepository, ThirdPartyApis }) {
    super();
    this.ClipPersonRepository = ClipPersonRepository;
    this.ThirdPartyApis = ThirdPartyApis;
  }
 
  async execute(clipId, detectedPersonId) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const signed = signURL.generateKeypointsSignedUrl(clipId, detectedPersonId);
    const pathURL = `https://${signed.bucketName}.s3.ap-southeast-1.amazonaws.com/${signed.key}`;
    
    try {
      const signedUrl = signed.signedUrl;
      await this.ClipPersonRepository.update(detectedPersonId, {'keyPointLink':pathURL});
      //console.log('UPDATED PERSON :', updatedPerson);
      const created = {
        signedUrl,
        pathURL
      };
      return this.emit(SUCCESS, created);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

GenerateKeypointsSignedUrl.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = GenerateKeypointsSignedUrl;
