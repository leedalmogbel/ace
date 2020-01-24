const { Operation } = require('@amberjs/core');

class MatchReport extends Operation {
  constructor({ AnalyticsRepository, logger }) {
    super();
    this.AnalyticsRepository = AnalyticsRepository;
    this.logger = logger;
  }

  async execute(params) {
    const { SUCCESS, ERROR } = this.events;
    this.logger.info(`PARAMS : ${params}`);
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
    
