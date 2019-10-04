const { Operation } = require('@amberjs/core');
const signURL = require('../infra/services/signedUrl');
const Video = require('src/domain/Video');

class GetSignedURL extends Operation {
  constructor({ VideoRepository }) {
    super();
    this.VideoRepository = VideoRepository;
  }

  async execute(data) {     
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
    console.log(data);

    const signed = signURL.fileUpload(data.userId);
    const pathURL = `https://${signed.bucketName}.s3.ap-southeast-1.amazonaws.com/${signed.key}`;
    const dataRDS = {
      userId: data.userId,
      path: pathURL,
      status: 'PENDING'
    };

    const video = new Video(dataRDS);
    try {
      // const message = 'Video Uploading';
      console.log(signed.key);
      console.log(dataRDS);
      const signedUrl = signed.signedUrl;
      console.log(signedUrl);
      const newVideo = await this.VideoRepository.add(video);
      const videoData = [{userId:newVideo.userId, path:newVideo.path, status:newVideo.status}];
      const created = {
        signedUrl,
        videoData
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

GetSignedURL.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = GetSignedURL;
