const { Operation } = require('@amberjs/core');
const signURL = require('src/infra/services/signedUrl');
const {Video, Dance, Tennis} = require('src/domain/Video');
const activityOneArr = {
  TENNIS : 'tennis',
  DANCE : 'dance'
};


class GetSignedURL extends Operation {
  constructor({ VideoRepository, TennisRepository, DanceRepository}) {
    super();
    this.VideoRepository = VideoRepository;
    this.TennisRepository = TennisRepository;
    this.DanceRepository = DanceRepository;
  }

  async execute(data) {     
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
    let errorArr = [];
    // Get Signed URL
    const videoName = `${data.location}_${data.date}_${data.time}`;
    const signed = signURL.fileUpload(data.userId, data.fileType, videoName);
    const videoURL = `${signed.s3Domain}/${signed.videoURI}`;
    // Validate video
    const videoParams = {
      ...data,
      videoName: videoName,
      path: signed.videoURI
    };

    const video = new Video(videoParams);
    const videoValidation = video.validate();
    if (!videoValidation.valid) {
      errorArr.push(...videoValidation.errors);
    }

    // Check subActivityOne value if tennis or dance 
    const tennis = new Tennis(data);
    const dance = new Dance(data);
    switch (video.subActivityOne) {
      case activityOneArr.TENNIS:
        const tennisValidation = tennis.validate();
        if (!tennisValidation.valid) {
          errorArr.push(...tennisValidation.errors);
        }
        break;
      case activityOneArr.DANCE:
        const danceValidation = dance.validate();
        if (!danceValidation.valid) {
          errorArr.push(...danceValidation.errors);
        }
          break;
      default:
        break;
    }

    if(errorArr.length > 0){
      return this.emit(VALIDATION_ERROR, {
        details: {
          errors : errorArr
        }
      });
    }

    try {
      const signedUrl = signed.signedUrl;
      // Save data to videos table and tennis or dance table AND use through
      const newVideo = await this.VideoRepository.add(video, dance, tennis, data.users);
     // const newVideoData = await this.VideoRepository.getOne(newVideo.id);
     
      const created = {
        signedUrl,
        newVideo
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
