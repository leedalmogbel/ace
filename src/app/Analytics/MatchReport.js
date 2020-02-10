const { Operation } = require('@amberjs/core');

class MatchReport extends Operation {
  constructor({ AnalyticsRepository, logger }) {
    super();
    this.AnalyticsRepository = AnalyticsRepository;
    this.logger = logger;
  }

  async execute(params) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
    this.logger.info(`PARAMS : ${JSON.stringify(params)}`);
    
    if (!params.videoId) {
      return this.emit(VALIDATION_ERROR, {
        details: {
          errors : {
            message: 'Video Id is required.',
            path: 'videoId'
          }
        }
      });
    }
    
    try {
      const matches = await this.AnalyticsRepository.getMatchReports(params);
      return this.emit(SUCCESS, matches);
    } catch(error) {
      return this.emit(ERROR, error);
    }
  }
}

MatchReport.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = MatchReport;
    