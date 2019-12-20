const { Operation } = require('@amberjs/core');
const signURL = require('src/infra/services/signedUrl');

class GenerateModelSignedUrl extends Operation {
  constructor({ ClipPersonRepository, ThirdPartyApis, ClipRepository }) {
    super();
    this.ClipPersonRepository = ClipPersonRepository;
    this.ThirdPartyApis = ThirdPartyApis;
    this.ClipRepository = ClipRepository;
  }
 
  async execute(clipId, detectedPersonId) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const clipParentData = await this.ClipRepository.getClipParent(clipId);
    const key = `videos/${process.env.NODE_ENV}/${new Date().toISOString().substr(0, 10)}/${clipParentData.video.userId}/${clipId}/${detectedPersonId}/${clipParentData.video.videoName}.h5`;
    const generatedData = signURL.generateSignedUrlForModel(key);
    try {
      console.log('GenerateModelSignedURL : ', generatedData.pathURL);
      await this.ClipPersonRepository.update(detectedPersonId, {'modelLink':generatedData.pathURL});
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
