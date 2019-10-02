const { Operation } = require('@amberjs/core');
const signURL = require('../infra/services/signedUrl');
const saveVideo = require('./CreateVideo');

class GetSignedURL extends Operation {
  constructor() {
    super();
  }

  async execute(data) {     
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
    
    try {
      const signed = signURL.fileUpload(data.userId);
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
