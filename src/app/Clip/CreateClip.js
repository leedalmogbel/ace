const { Operation } = require('@amberjs/core');
const {Clip} = require('src/domain/Clip');
const Utils = require('src/infra/services/utils.js');

class CreateClip extends Operation {
  constructor({ ClipRepository, VideoRepository, ThirdPartyApis }) {
    super();
    this.ClipRepository = ClipRepository;
    this.VideoRepository = VideoRepository;
    this.ThirdPartyApis = ThirdPartyApis;
  }

  async execute(data) {
    
    // Implement service/usecase logic here. eg:
      
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
    
    const nameStartTime = Utils().formatTime(data.startTime);
    const nameEndTime = Utils().formatTime(data.endTime);
  
    const video = await this.VideoRepository.getVideoName(data.videoId);
    data.clipName = `${video[0].videoName}-from:${nameStartTime}_to:${nameEndTime}`;
  
   
    const clip = new Clip(data);
    
    try {
      const message = 'Clip Created';
      const newClip = await this.ClipRepository.add(clip);
      //check if goldStandard is true
      const data = Utils().resSuccess(newClip, message);
      this.emit(SUCCESS, data);

      // if(clip.goldStandard){
      //   // check if data exist in detectedPersonData
      //   let dataForPersonDetection = await this.ClipRepository.getDataWithRelation(newClip.id);
      //   let response = await this.ThirdPartyApis.callPersonDetection(dataForPersonDetection); 
      // }

      // if(clip.forInference){
      //   console.log('INFERENCE IS TRUE');
      //   let dataForPersonDetection = await this.ClipRepository.getDataWithRelation(newClip.id);
      //   let response = await this.ThirdPartyApis.callPersonDetection(dataForPersonDetection); 
      // }
      let dataForPersonDetection = await this.ClipRepository.getDataWithRelation(newClip.id);
      console.log('CREATE CLIP person detection DATA : ', dataForPersonDetection);
      let response = await this.ThirdPartyApis.callPersonDetection(dataForPersonDetection); 
      console.log('CREATE CLIP person detection : ', response);

      return;
    } catch(error) {
      console.log('CreateClip Error :', error);
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
