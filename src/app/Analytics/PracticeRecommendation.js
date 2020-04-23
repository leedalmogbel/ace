const { Operation } = require('@amberjs/core');
const {VideoId} = require('src/domain/Analytics');
const Utils = require('src/infra/services/utils.js');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const pointsResultList = {
  ACE: 'ace',
  DOUBLE_FAULT: 'double-fault',
  WINNER: 'winner',
  UNFORCED_ERROR: 'unforced-error',
  FORCED_ERROR_ON_OPPONENT: 'forced-error-on-opponent',
  TENTATIVE_ON_OFFENSE: 'tentative-on-offense'
};

class PracticeRecommendation extends Operation {
  constructor({ ClipRepository, logger, AnalyticsService }) {
    super();
    this.ClipRepository = ClipRepository;
    this.logger = logger;
    this.AnalyticsService = AnalyticsService;
  }

  async execute(params) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
    this.logger.info(`PracticeRecommendation PARAMS : ${JSON.stringify(params)}`);
    
    const video = new VideoId(params);
    const { valid, errors } = video.validate(params);
    if (!valid) {
      return this.emit(VALIDATION_ERROR, {
        details: {
          errors : errors
        }
      });
    }


    let filters = {
      videoId : params.videoId
    };
 
    if(params.shotType && (JSON.parse(params.shotType).length > 0)){
      filters.shotType = {
        [Op.in] : JSON.parse(params.shotType)
      };
    }

    if(params.hitSpot && (JSON.parse(params.hitSpot).length > 0)){
      filters.hitSpot = {
        [Op.in] : JSON.parse(params.hitSpot)
      };
    }

    if(params.shotDirection && (JSON.parse(params.shotDirection).length > 0)){
      filters.shotDirection = {
        [Op.in] : JSON.parse(params.shotDirection)
      };
    }

    
    try {
      filters.shotResult = [pointsResultList.WINNER, pointsResultList.FORCED_ERROR_ON_OPPONENT];
      const bestShots = await this.ClipRepository.getShotTypeTotalCount(filters).then(data => {
        return data.sort(Utils().compareValues('total', 'desc'));
      });

  
      filters.shotResult = [pointsResultList.UNFORCED_ERROR, pointsResultList.TENTATIVE_ON_OFFENSE];
      const worseShots = await this.ClipRepository.getShotTypeTotalCount(filters).then(data => {
        return data.sort(Utils().compareValues('total', 'desc'));
      });

      const result = {
        bestShots : bestShots,
        worseShots : worseShots
      };
      
      return this.emit(SUCCESS, result);
    } catch(error) {
      return this.emit(ERROR, error);
    }
  }
}

PracticeRecommendation.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = PracticeRecommendation;
    
