const { Operation } = require('@amberjs/core');
const signURL = require('src/infra/services/signedUrl');

class GenerateVideoSignedUrl extends Operation {
  constructor({ ClipPersonRepository, ThirdPartyApis, ClipRepository, PersonKeypointRepository }) {
    super();
    this.ClipPersonRepository = ClipPersonRepository;
    this.ThirdPartyApis = ThirdPartyApis;
    this.ClipRepository = ClipRepository;
    this.PersonKeypointRepository = PersonKeypointRepository;
  }
 
  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const clipParentData = await this.ClipRepository.getClipParent(data.clipId);
    const key = `videos/${process.env.NODE_ENV}/${new Date().toISOString().substr(0, 10)}/${clipParentData.video.userId}/${data.clipId}/${data.clipPersonId}/${clipParentData.video.videoName}.mp4`.replace(/\s/g, '');
    const generatedData = signURL.generateSignedUrlForVideo(key);
    try {
      console.log('GenerateVideoSignedURL : ', generatedData.pathURL);
      await this.PersonKeypointRepository.update(data.personKeypointId, {'skeletonLink':generatedData.pathURL, status:'successSkeleton'});
      return this.emit(SUCCESS, generatedData);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

GenerateVideoSignedUrl.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = GenerateVideoSignedUrl;
