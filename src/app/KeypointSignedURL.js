const { Operation } = require('@amberjs/core');
const signURL = require('../infra/services/signedUrl');
const Keypoint = require('src/domain/Keypoint');

class KeypointSignedURL extends Operation {
  constructor({ KeypointRepository }) {
    super();
    this.KeypointRepository = KeypointRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
    console.log(data);

    const signed = signURL.keypointsUpload(data.clipId);
    const pathURL = `https://${signed.bucketName}.s3.ap-southeast-1.amazonaws.com/${signed.key}`;
    console.log(pathURL);
    const dataRDS = {
      clipId: data.clipId,
      clipPath: pathURL,
    };

    const keypoint = new Keypoint(dataRDS);
    try {
      console.log(signed.key);
      console.log(dataRDS);
      const signedUrl = signed.signedUrl;
      console.log(signedUrl);
      const newKeypoint = await this.KeypointRepository.add(keypoint);
      const moveData = [{keypointId:newKeypoint.id, clipId:newKeypoint.clipId, path:newKeypoint.clipPath}];
      const created = {
        signedUrl,
        moveData
      };
      console.log(created);
      // const saveVideo
      this.emit(SUCCESS, created);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
  }
}

KeypointSignedURL.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = KeypointSignedURL;
