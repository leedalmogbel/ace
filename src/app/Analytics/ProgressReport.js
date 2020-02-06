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
      //   const matches = {
      //     consistency:{
      //       label : ['Match #1', 'Match #2', 'Match #3', 'Match #4', 'Match #5'],
      //       data: [
      //         {
      //           name: '1st serve pts won',
      //           scores: [80, 0, 78, 66, 80]
      //         },
      //         {
      //           name: '2nd serve pts won',
      //           scores: [72, 77, 70, 77, 72]
      //         }
      //         ,
      //         {
      //           name: 'Return pts won',
      //           scores: [0, 77, 0, 77, 0]
      //         }
      //       ]
      //     },
      //     aggressiveness:{
      //       label: ['Match #1', 'Match #2', 'Match #3', 'Match #4', 'Match #5'],
      //       data: [
      //         {
      //           name: 'Aces/Double Faults',
      //           scores: [12, 0, 0, 0, 0]
      //         },
      //         {
      //           name: 'Winners/ Unforced Errors',
      //           scores: [17, 20, 13, 30, 25]
      //         }
      //       ]
      //     }
      //   };
      return this.emit(SUCCESS, matches);
    } catch(error) {
      return this.emit(ERROR, error);
    }
  }
}

ProgressReport.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ProgressReport;
    
