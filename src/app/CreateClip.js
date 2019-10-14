const { Operation } = require('@amberjs/core');
const Clip = require('src/domain/Clip');
const Utils = require('src/infra/services/utils.js');

class CreateClip extends Operation {
  constructor({ ClipRepository, VideoRepository }) {
    super();
    this.ClipRepository = ClipRepository;
    this.VideoRepository = VideoRepository;
  }

  async execute(data) {
    
    // Implement service/usecase logic here. eg:
      
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
    
    data.startTime = Utils().formatTime(data.startTime);
    data.endTime = Utils().formatTime(data.endTime);
    console.log(data.videoId);


    const video = await this.VideoRepository.getVideoName(data.videoId);
    data.clipName = `${video[0].videoName}-from:${data.startTime}_to:${data.endTime}`;
    console.log(data.clipName);
    
    const clip = new Clip(data);
    
    try {
      const message = 'Clip Created';
      const newClip = await this.ClipRepository.add(clip);
      const data = Utils().resSuccess(newClip, message);
      this.emit(SUCCESS, data);
    } catch(error) {
      const dataError = Utils().resError(error);
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, dataError);
      }
      this.emit(ERROR, dataError);
    }
  }
}

CreateClip.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateClip;
