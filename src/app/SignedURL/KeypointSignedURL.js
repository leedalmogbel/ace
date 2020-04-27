const { Operation } = require('@amberjs/core');
const signURL = require('src/infra/services/signedUrl');
const {Keypoint} = require('src/domain/Keypoint');

class KeypointSignedURL extends Operation {
  constructor({ KeypointRepository }) {
    super();
    this.KeypointRepository = KeypointRepository;
  }
 
  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const signed = signURL.keypointsUpload(data.clipId);
    console.log('SIGNED : ', signed);
    const pathURL = `https://${signed.bucketName}.s3.ap-southeast-1.amazonaws.com/${signed.key}`;
    const dataRDS = {
      clipId: data.clipId,
      clipPath: pathURL,
    };

    const keypoint = new Keypoint(dataRDS);
    try {
      const signedUrl = signed.signedUrl;
      const newKeypoint = await this.KeypointRepository.add(keypoint);
      const moveData = [{keypointId:newKeypoint.id, clipId:newKeypoint.clipId, path:newKeypoint.clipPath}];
      const created = {
        signedUrl,
        moveData
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

KeypointSignedURL.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = KeypointSignedURL;
