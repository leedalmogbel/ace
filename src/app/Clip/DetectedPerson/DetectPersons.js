const { Operation } = require('@amberjs/core');
  
class DetectPersons extends Operation {
  constructor({ ClipRepository, FailedQueueRepository, logger, ThirdPartyApis}) {
    super();
    this.ClipRepository = ClipRepository;
    this.FailedQueueRepository = FailedQueueRepository;
    this.logger = logger;
    this.ThirdPartyApis = ThirdPartyApis;
  }

  async execute(id) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.events;
    try {
      //let clip = await this.ClipRepository.getById(id);
      let clip = await this.ClipRepository.update(id, {detectPersonStatus:'processing'});
      let video = await clip.getVideo();
      console.log('DetectPersons VIDEO : ', video);
      const s3Domain= `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com`;

      let dataForPersonDetection = {
        clip_id: clip.id,
        start: clip.startTime,
        video_path: `${s3Domain}/${video.path}`
      };

      this.logger.info(`DetectPersons ; Data for AI Extraction : , ${JSON.stringify(dataForPersonDetection)}`);
      
      try {
        let response = await this.ThirdPartyApis.callPersonDetection(dataForPersonDetection); 
        if(response.data.message == 'Busy'){
        // save to FailedQueue
          this.FailedQueueRepository.add({
            data: JSON.stringify(dataForPersonDetection),
            source: 'personDetection',
          });
          this.ClipRepository.update(clip.id, {detectPersonStatus:'serverBusy'});
        }
      } catch (error) {
        console.log('DETECT PERSON ERROR : ', error);
        this.ClipRepository.update(clip.id, {detectPersonStatus:'failedServer'});
      }
      
      return this.emit(SUCCESS, { message: 'Processing'});
    } catch(error) {
      switch(error.message) {
      case 'ValidationError':
        return this.emit(VALIDATION_ERROR, error);
      case 'NotFoundError':
        return this.emit(NOT_FOUND, error);
      default:
        return this.emit(ERROR, error);
      }
    }
  }
}

DetectPersons.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = DetectPersons;
    
