const { Operation } = require('@amberjs/core');

class MatchReport extends Operation {
  constructor({ ClipRepository, logger, AnalyticsService }) {
    super();
    this.ClipRepository = ClipRepository;
    this.logger = logger;
    this.AnalyticsService = AnalyticsService;
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
      //const matches = await this.ClipRepository.getMatchReports(params);
      const uniqueMoveCounts = await this.ClipRepository.getUniqueMoveTotalCount(params.videoId);
      const uniqueShotResultCounts = await this.ClipRepository.getUniqueShotResultTotalCount(params);
      let matches = this.AnalyticsService.getMatchAnalytics(uniqueMoveCounts, uniqueShotResultCounts);
      return this.emit(SUCCESS, matches);
    } catch(error) {
      return this.emit(ERROR, error);
    }
  }
}

MatchReport.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = MatchReport;
    
