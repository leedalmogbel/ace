const { Operation } = require('@amberjs/core');

/**
 * Once updated AnaylticsService should also be updated
 */
const matchStatList = {
  FIRST_SERVE_PERCENT: '1st serve %',
  SECOND_SERVE_PERCENT: '2nd serve %',
  FIRST_SERVE_WON: '1st serve pts won',
  SECOND_SERVE_WON: '2nd serve pts won',
  RETURN_SHOT_WON: 'return pts won'
};

/**
 * Once updated AnaylticsService should also be updated
 */
const pointsResultList = {
  ACE: 'ace',
  DOUBLE_FAULT: 'double-fault',
  WINNER: 'winner',
  UNFORCED_ERROR: 'unforced-error',
  FORCED_ERROR_ON_OPPONENT: 'forced-error-on-opponent',
  TENTATIVE_ON_OFFENSE: 'tentative-on-offense'
};


const mergeData = (input) => input.reduce((acc, val) => {
  const { data, pointResults } = val;
  // Merge Data
  data.forEach(({ name, stats }) => {
    let key = acc.data.return;
    switch (name) {
    case matchStatList.FIRST_SERVE_PERCENT:
    case matchStatList.FIRST_SERVE_WON:
      key = acc.data.first;
      break;
    case matchStatList.SECOND_SERVE_PERCENT:
    case matchStatList.SECOND_SERVE_WON:
      key = acc.data.second;
      break;
    default:
      break;
    }
    const matchedSetIndex = key.findIndex(accData => accData.name === name);
    stats = isNaN(stats) ? 0 : stats;
    
    if (matchedSetIndex !== -1) {
      key[matchedSetIndex].scores.push(stats);
    } else {
      key.push({
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
  data: {
    first : [],
    second: [],
    return : []
  },
  pointResults: []
});


class ProgressReport extends Operation {
  constructor({ ClipRepository, VideoRepository, logger, AnalyticsService }) {
    super();
    this.ClipRepository = ClipRepository;
    this.VideoRepository = VideoRepository;
    this.logger = logger;
    this.AnalyticsService = AnalyticsService;
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
      //const matches = await this.ClipRepository.getProgressReports(params);
      let labels = [];

      const videos = await this.VideoRepository.getAllVideo({userId : params.userId, matchType : 'match'}); //getAll Match videos based on matchType and userId

      let self = this;

      const getData = async () => {
        return Promise.all(
          videos.map((video, index)=>{
            labels.push(`Match #${index + 1}`);
            return Promise.all([self.ClipRepository.getUniqueMoveTotalCount(video.id), self.ClipRepository.getUniqueShotResultTotalCount({videoId : video.id})]);
          })
        );
      };

      let progressData = await getData().then(queryResultArr => {
        return Promise.all(
          queryResultArr.map((result) => {
            return self.AnalyticsService.getMatchAnalytics(result[0], result[1]);
          })
        );
      });

    
      let mergedData = await mergeData(progressData);
      console.log(`MERGE DATA : ${JSON.stringify(mergedData)}`);
      let pointsResult = [
        {
          name: 'Winners/Unforced Errors',
          scores: await this.AnalyticsService.getProgressAnalytics(mergedData.pointResults.find( d => d.name === pointsResultList.WINNER).total, mergedData.pointResults.find( d => d.name === pointsResultList.UNFORCED_ERROR).total)
        },
        {
          name: 'Forced errors on opponent/pt lost tentative on offense',
          scores: await this.AnalyticsService.getProgressAnalytics(mergedData.pointResults.find( d => d.name === pointsResultList.FORCED_ERROR_ON_OPPONENT).total, mergedData.pointResults.find( d => d.name === pointsResultList.TENTATIVE_ON_OFFENSE).total)
        }
      ];
      
      console.log(`POINTS RESULT : ${JSON.stringify(pointsResult)}`);
      let progressDashboard = {
        consistency : {
          label : labels,
          data : mergedData.data
        },
        aggressiveness : {
          label : labels,
          data : pointsResult
        },
      };


      return this.emit(SUCCESS, progressDashboard);
    } catch(error) {
      return this.emit(ERROR, error);
    }
  }
}

ProgressReport.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ProgressReport;
    
