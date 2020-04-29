const { Operation } = require('@amberjs/core');
const {VideoId} = require('src/domain/Video');
const Utils = require('src/infra/services/utils.js');

class AutoCreateClip extends Operation {
  constructor({ ThirdPartyApis, VideoRepository }) {
    super();
    this.ThirdPartyApis = ThirdPartyApis;
    this.VideoRepository = VideoRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
    const video = new VideoId(data);
    const { valid, errors } = video.validate(data);
    if (!valid) {
      return this.emit(VALIDATION_ERROR, {
        details: {
          errors : errors
        }
      });
    }
    
    try {
      let videoData = await this.VideoRepository.getById(data.videoId);
      console.log('AutoCreateClip VideoData ', videoData);
      if(videoData){
        this.ThirdPartyApis.callAutoClipCreation({
          video_id : videoData.id,
          video_path : videoData.path
        }); 
      }
    
      return this.emit(SUCCESS, {
        message: 'Success',
        data : videoData
      });
    } catch(error) {

      this.logger.error(`AutoCreateClip; ERROR : , ${JSON.stringify(error)}`);

      const dataError = Utils().resError(error);
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, dataError);
      }
      return this.emit(ERROR, dataError);
    }
  }
}

AutoCreateClip.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = AutoCreateClip;
