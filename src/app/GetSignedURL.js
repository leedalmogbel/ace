const { Operation } = require('@amberjs/core');
const signURL = require('../infra/services/signedUrl');
// const Video = require('src/domain/Video');

class GetSignedURL extends Operation {
  constructor({ VideoRepository }) {
    super();
    this.VideoRepository = VideoRepository;
  }

  async execute(data) {     
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
    console.log(data);
    // const video = new Video(data);

    try {
      const signed = signURL.fileUpload(data.userId);
      // const message = 'Video Uploading';
      // const newVideo = await this.VideoRepository.add(video);
      // const videoData
      // const saveVideo
      this.emit(SUCCESS, signed);
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
