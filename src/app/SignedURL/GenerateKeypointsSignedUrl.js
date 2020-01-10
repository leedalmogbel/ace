const { Operation } = require('@amberjs/core');
const signURL = require('src/infra/services/signedUrl');

class GenerateKeypointsSignedUrl extends Operation {
  constructor({ ClipPersonRepository, ThirdPartyApis, PersonKeypointRepository }) {
    super();
    this.ClipPersonRepository = ClipPersonRepository;
    this.ThirdPartyApis = ThirdPartyApis;
    this.PersonKeypointRepository = PersonKeypointRepository;
  }
 
  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const signed = signURL.generateKeypointsSignedUrl(data.clipId, data.clipPersonId);
    const pathURL = `https://${signed.bucketName}.s3.ap-southeast-1.amazonaws.com/${signed.key}`;
    console.log('GenerateKeypointsSignedUrl DATA : ', data);
    try {
      const signedUrl = signed.signedUrl;
      console.log('GenerateKeypointSignedURL : ', pathURL);
      // update personkeypoint
      await this.PersonKeypointRepository.update(data.personKeypointId, {'keypointLink':pathURL});
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
