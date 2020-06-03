const { Operation } = require('@amberjs/core');
const {Clip} = require('src/domain/Clip');
const Utils = require('src/infra/services/utils.js');


class CreateClip extends Operation {
  constructor({ ClipRepository, VideoRepository, logger, sessionUser }) {
    super();
    this.ClipRepository = ClipRepository;
    this.VideoRepository = VideoRepository;
    this.logger = logger;
    this.sessionUser = sessionUser;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
    console.log(data);
    
    if(!data.clipName || data.clipName == ''){
      const nameStartTime = Utils().formatTime(data.startTime);
      const nameEndTime = Utils().formatTime(data.endTime);
      const video = await this.VideoRepository.getVideoName(data.videoId);
      data.clipName = `${video[0].videoName}-from:${nameStartTime}_to:${nameEndTime}`;
    }

    let params = {
      ...data,
      createdBy: this.sessionUser.id, // must updated based on logged user
      updatedBy: this.sessionUser.id // must updated based on logged user
    }
   
    const clip = new Clip(params);
    const { valid, errors } = clip.validate();
    if (!valid) {
      return this.emit(VALIDATION_ERROR, {
        details: {
          errors : errors
        }
      });
    }
    
    try {
      const newClip = await this.ClipRepository.add(clip);
      this.logger.info(`CreateClip; Saved data : , ${JSON.stringify(newClip)}`);
      const data = Utils().resSuccess(newClip, 'ClipCreated');
      return this.emit(SUCCESS, data);
    } catch(error) {

      this.logger.error(`CreateClip; ERROR : , ${JSON.stringify(error)}`);

      const dataError = Utils().resError(error);
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, dataError);
      }
      return this.emit(ERROR, dataError);
    }
  }
}

CreateClip.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateClip;
