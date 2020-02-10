const { Operation } = require('@amberjs/core');

class ProgressReport extends Operation {
  constructor({ AnalyticsRepository, logger }) {
    super();
    this.AnalyticsRepository = AnalyticsRepository;
    this.logger = logger;
  }

  async execute(params) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
    this.logger.info(`PARAMS : ${params}`);
    if (!params.userId) {
      return this.emit(VALIDATION_ERROR, {
        details: {
          errors : {
            message: 'User Id is required.',
            path: 'userId'
          }
        }
      });
    }
    try {
      const matches = await this.AnalyticsRepository.getProgressReports(params);
      return this.emit(SUCCESS, matches);
    } catch(error) {
      return this.emit(ERROR, error);
    }
  }
}

ProgressReport.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ProgressReport;
    
