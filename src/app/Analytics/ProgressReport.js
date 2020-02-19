const { Operation } = require('@amberjs/core');
const mergeData = (input) => input.reduce((acc, val) => {
  const { label, data, pointResults } = val;
  acc.labels.push(label);
  // Merge Data
  data.forEach(({ name, stats }) => {
    const matchedSetIndex = acc.data.findIndex(accData => accData.name === name);
    if (matchedSetIndex !== -1) {
      acc.data[matchedSetIndex].scores.push(stats);
    } else {
      acc.data.push({
        name,
        scores: [stats]
      });
    }
  });

  // Merge pointResults
  pointResults.forEach(({ name, total }) => {
    const matchedSetIndex = acc.pointResults.findIndex(accData => accData.name === name);
    if (matchedSetIndex !== -1) {
      acc.pointResults[matchedSetIndex].total.push(total);
    } else {
      acc.pointResults.push({
        name,
        total: [total]
      });
    }

  });

  return acc;
}, {
  labels: [],
  data: [],
  pointResults: []
});

class ProgressReport extends Operation {
  constructor({ ClipRepository, VideoRepository, logger }) {
    super();
    this.ClipRepository = ClipRepository;
    this.VideoRepository = VideoRepository;
    this.logger = logger;
  }

  async execute(params) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
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
      const matches = await this.ClipRepository.getProgressReports(params);
      return this.emit(SUCCESS, matches);
    } catch(error) {
      return this.emit(ERROR, error);
    }
  }
}

ProgressReport.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ProgressReport;
    
