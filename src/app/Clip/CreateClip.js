const { Operation } = require('@amberjs/core');
const {Clip} = require('src/domain/Clip');
const Utils = require('src/infra/services/utils.js');

class CreateClip extends Operation {
  constructor({ ClipRepository, VideoRepository, ThirdPartyApis, logger }) {
    super();
    this.ClipRepository = ClipRepository;
    this.VideoRepository = VideoRepository;
    this.ThirdPartyApis = ThirdPartyApis;
    this.logger = logger;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
    
    const nameStartTime = Utils().formatTime(data.startTime);
    const nameEndTime = Utils().formatTime(data.endTime);
    const video = await this.VideoRepository.getVideoName(data.videoId);
    data.clipName = `${video[0].videoName}-from:${nameStartTime}_to:${nameEndTime}`;
  
   
    const clip = new Clip(data);
    const { valid, errors } = clip.validate(data);
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
      this.emit(SUCCESS, data);
      
      let dataForPersonDetection = await this.ClipRepository.getDataWithRelation(newClip.id);

      this.logger.info(`CreateClip; Data for AI Extraction : , ${JSON.stringify(dataForPersonDetection)}`);
      
      let response = await this.ThirdPartyApis.callPersonDetection(dataForPersonDetection); 
      if(response.data.message == 'Busy'){
        this.ClipRepository.update(newClip.id, {status:'failed'});
      }
      
      this.logger.info(`CreateClip; AI Extraction response : , ${JSON.stringify(response.data)}`); // causes circular error
     
      return;
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
