const { Operation } = require('@amberjs/core');
const signURL = require('src/infra/services/signedUrl');
const {Video} = require('src/domain/Video');
const Match = require('src/domain/Match');

class GetSignedURL extends Operation {
  constructor({ VideoRepository, MatchRepository }) {
    super();
    this.VideoRepository = VideoRepository;
    this.MatchRepository = MatchRepository;
  }

  async execute(data) {     
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const videoName = `${data.location}_${data.date}_${data.time}`;
    const signed = signURL.fileUpload(data.userId, data.fileType, videoName);
    const pathURL = `https://${signed.bucketName}.s3.ap-southeast-1.amazonaws.com/${signed.key}`;
    const dataRDS = {
      ...data,
      videoName: videoName,
      path: pathURL,
      status: 'PENDING',
    };

    const video = new Video(dataRDS);
    const { valid, errors } = video.validate(dataRDS);
    if (!valid) {
      return this.emit(VALIDATION_ERROR, {
        details: {
          errors : errors
        }
      });
    }

    try {
      const signedUrl = signed.signedUrl;
      const newVideo = await this.VideoRepository.add(video);
      if (data.matchType === 'match') {
        const dataMatch = {
          videoId: newVideo.id,
          type: data.type,
          tournament: data.tournament,
          result: data.matchResult,
        };
        const match = new Match(dataMatch);
        const newMatch = await this.MatchRepository.add(match);
        console.log('UPLOADED VIDEO : ', newMatch);
      }
      const videoData = [{
        videoId:newVideo.id,
        userId:newVideo.userId,
        videoName:newVideo.videoName,
        path:newVideo.path,
        opponent: newVideo.opponent,
        matchType: newVideo.matchType,
        type: data.type,
        tournament: data.tournament,
        result: data.matchResult,
        location: newVideo.location,
        date: newVideo.date,
        time: newVideo.time,
      }];

      const created = {
        signedUrl,
        videoData
      };
      return this.emit(SUCCESS, created);
    } catch(error) {
      if(error.name === 'SequelizeUniqueConstraintError') {
        return this.emit(VALIDATION_ERROR, {
          details: {
            errors : [{
              message: 'Video already exist!',
              path: 'date'
            }]
          }
        });
      }
      return this.emit(ERROR, error);
    }
  }
}

GetSignedURL.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = GetSignedURL;
