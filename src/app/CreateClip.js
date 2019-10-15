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

    const video = await this.VideoRepository.getVideoName(data.videoId);
    data.clipName = `${video[0].videoName}-from:${data.startTime}_to:${data.endTime}`;

    const newData = {
      videoId: data.videoId,
      clipName: data.clipName,
      set: data.set,
      game: data.game,
      serveIn: data.serveIn,
      serveWon: data.serveWon,
      startTime: data.startTime,
      endTime: data.endTime,
      currentSetScore: data.currentSetScore,
      currentGameScore: data.currentGameScore,
      shotType: data.shotType,
      moveDirection: data.moveDirection,
      hitSpot: data.hitSpot,
      shotResult: data.shotResult,
      errorType: data.errorType,
      spin: data.spin,
      shotDirection: data.shotDirection,
      speed: data.speed
    };
    
    const clip = new Clip(newData);
    
    try {
      const message = 'Clip Created';
      const newClip = await this.ClipRepository.add(clip);
      const data = Utils().resSuccess(newClip, message);
      return this.emit(SUCCESS, data);
    } catch(error) {
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
