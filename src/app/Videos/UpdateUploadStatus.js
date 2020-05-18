const { Operation } = require('@amberjs/core');
class UpdateUploadStatus extends Operation {
  constructor({ VideoRepository, ThirdPartyApis }) {
    super();
    this.VideoRepository = VideoRepository;
    this.ThirdPartyApis = ThirdPartyApis;
  }

  async execute(id, params) {
    const { SUCCESS, NOT_FOUND, ERROR } = this.events;
    const statusArr = ['n/a', 'failedProcess', 'failedServer'];

    try {
      let videoData = await this.VideoRepository.update(id, params);
      videoData = videoData.toJSON();
      /**
      * If status = 'uploaded' AND autocreateclip = true AND status value in statusArr
      *     call AI link for autoClip
      */
      if(videoData.uploadStatus == 'uploaded' && statusArr.includes(videoData.status) && videoData.autoCreateClip){
        const bucketName = process.env.AWS_S3_BUCKET;
        const s3Region = process.env.AWS_S3_REGION;
        const s3Domain= `https://${bucketName}.s3.${s3Region}.amazonaws.com`;

        this.ThirdPartyApis.callAutoClipCreation({
          video_id : videoData.id,
          video_path : `${s3Domain}/${videoData.path}`
        }); 
        console.log('S3 DOMAIN ', s3Domain);
      }
      
      return this.emit(SUCCESS, videoData);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
    
      return this.emit(ERROR, error);
    }
  }
}

UpdateUploadStatus.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = UpdateUploadStatus;
    
