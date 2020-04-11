/**
 * Array of shotResult possible values in DB
 */
const pointsResultList = {
  ACE: 'ace',
  DOUBLE_FAULT: 'double-fault',
  WINNER: 'winner',
  UNFORCED_ERROR: 'unforced-error',
  FORCED_ERROR_ON_OPPONENT: 'forced-error-on-opponent',
  TENTATIVE_ON_DEFENSE: 'tentative-on-defense'
};

/**
 * Array of move possible values in DB
 */
const moveList = {
  FIRST_SERVE: '1st',
  SECOND_SERVE: '2nd',
  RETURN_SHOT: 'return'
};

const mergeArr = (origData, newData, key) => origData.filter( aa => ! newData.find ( bb => aa[key] === bb[key]) ).concat(newData);


const matchStatList = {
  FIRST_SERVE_PERCENT: '1st serve %',
  SECOND_SERVE_PERCENT: '2nd serve %',
  FIRST_SERVE_WON: '1st serve pts won',
  SECOND_SERVE_WON: '2nd serve pts won',
  RETURN_SHOT_WON: 'return pts won'
};

/**
 * Array of shotResult possible values in DB
 */
class AnalyticsService {
  constructor() {
    this.MatchClass = new MatchAnalytics();
  }

  getMatchAnalytics(basicData, advanceData){
    let basicMatchStat = this.MatchClass.formatBasicMatchData(basicData);
    let advanceMatchStat = this.MatchClass.formatAdvanceMatchData(advanceData);
    let basicStatComputation = this.MatchClass.computeBasicStatistics(basicMatchStat, advanceMatchStat);
    
    return {
      data: basicStatComputation,
      pointResults: advanceMatchStat
    };

  }
}


class MatchAnalytics{
  /**
     * 
     * @param {*} data 
     * Basic Match Data refer to 1st serve, 2nd serve and return
     */
  formatBasicMatchData(data){
    let initialValue= {
      return : {total : 0, totalWin : 0},
      first : {total : 0, totalWin : 0},
      second : {total : 0, totalWin : 0},
    };

    data.forEach(result => {
      switch (result.dataValues.move) {
      case moveList.FIRST_SERVE:
        initialValue.first.total = Number(result.dataValues.totalCount);
        initialValue.first.totalWin = Number(result.dataValues.totalWinCount);
        break;
      case moveList.SECOND_SERVE:
        initialValue.second.total = Number(result.dataValues.totalCount);
        initialValue.second.totalWin = Number(result.dataValues.totalWinCount);
        break;
      case moveList.RETURN_SHOT:
        initialValue.return.total = Number(result.dataValues.totalCount);
        initialValue.return.totalWin = Number(result.dataValues.totalWinCount);
        break;
       
      default:
        break;
      }
    });

    return initialValue;
  }

  formatAdvanceMatchData(data){
    let initialValue= [
      { name: pointsResultList.ACE, total: 1 },
      { name: pointsResultList.DOUBLE_FAULT, total: 0 },
      { name: pointsResultList.ACE, total: 3 },
      { name: pointsResultList.WINNER, total: 0 },
      { name: pointsResultList.UNFORCED_ERROR, total: 0 },
      { name: pointsResultList.FORCED_ERROR_ON_OPPONENT, total: 0 },
      { name: pointsResultList.TENTATIVE_ON_DEFENSE, total: 0 },
    ];
    
   
    let mapped = data.map((dt) => {
      data = JSON.parse(JSON.stringify(dt));
      data.total = Number(data.total);
      return data;
    });


    return mergeArr(initialValue, mapped, 'name');
  }

  computeBasicStatistics(basicData, advanceData){
    let doubleFaultVal = advanceData.filter(dt => dt.name == pointsResultList.DOUBLE_FAULT);

    const statResult = [
      {
        name: matchStatList.FIRST_SERVE_PERCENT,
        stats: Math.round(Number(basicData.first.total) / (Number(basicData.first.total) + Number(basicData.second.total)) * 100)
      },
      {
        name: matchStatList.SECOND_SERVE_PERCENT,
        stats: Math.round(( Number(basicData.second.total) - Number(doubleFaultVal[0].total)) / Number(basicData.second.total) * 100)
      },
      {
        name: matchStatList.FIRST_SERVE_WON,
        stats: Math.round(Number(basicData.first.totalWin) / Number(basicData.first.total) * 100 )
      },
      {
        name: matchStatList.SECOND_SERVE_WON,
        stats: Math.round(Number(basicData.second.totalWin) / Number(basicData.second.total) * 100)
      },
      {
        name: matchStatList.SECOND_SERVE_WON,
        stats: Math.round(Number(basicData.return.totalWin) / Number(basicData.return.total) * 100)
      }
    ];

    return statResult;
  }
}


module.exports = AnalyticsService;
