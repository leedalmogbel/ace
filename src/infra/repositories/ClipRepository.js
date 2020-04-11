
const { BaseRepository } = require('@amberjs/core');
const sequelize = require('sequelize');
const Op = require('sequelize').Op;

const pointsResult = {
  ACE: 'ace',
  DOUBLE_FAULT: 'double-fault',
  WINNER: 'winner',
  UNFORCED_ERROR: 'unforced-error',
  FORCED_ERROR_ON_OPPONENT: 'forced-error-on-opponent',
  TENTATIVE_ON_DEFENSE: 'tentative-on-defense'
};

const mergeArr = (origData, newData, key) => origData.filter( aa => ! newData.find ( bb => aa[key] === bb[key]) ).concat(newData);
const statSkeleton = [
  {
    name: "1st serve %",
    stats: 0
  },
  {
    name: "2nd serve %",
    stats: 0
  },
  {
    name: "1st serve pts won",
    stats: 0
  },
  {
    name: "2nd serve pts won",
    stats: 0
  },
  {
    name: "return pts won",
    stats: 0
  }
];

const pointResultsSkeleton =  [
  {
    name: pointsResult.ACE,
    total: 0
  },
  {
    name: pointsResult.DOUBLE_FAULT,
    total: 0
  },
  {
    name: pointsResult.WINNER,
    total: 0
  },
  {
    name: pointsResult.UNFORCED_ERROR,
    total: 0
  }
];

const mergeData = (input) => input.reduce((acc, val) => {
  const { label, data, pointResults } = val;
  acc.labels.push(label);
  // Merge Data
  data.forEach(({ name, stats }) => {
    const matchedSetIndex = acc.data.findIndex(accData => accData.name === name);
    stats = isNaN(stats) ? 0 : stats;
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

const getRatio = (firstArr, secondArr) => {
  return firstArr.map( (data, index) => {
   // console.log(`${data} / ${secondArr[index]}`);
    let ratio = Number(data) / Number(secondArr[index]);
    return (secondArr[index] == 0) ? 0 : ratio;
  })
};


class ClipRepository extends BaseRepository {
  constructor({ ClipModel, VideoModel }) {
    super(ClipModel);
    this.VideoModel = VideoModel;
  }

  async createClip(data) {
    const clipData = this.model.create(data);
    return clipData;
  }

  async getClipParent(id) {
    return await this._getById(id, {
      include: [
        {
          model: this.VideoModel,
          attributes: ['userId', 'videoName'],
          as: 'video'
        },
      ]
    });
  }

  getDataWithRelation(id){
    return this._getById(id, {
      include: [
        {
          model: this.VideoModel,
          attributes: ['path'],
          as: 'video'
        },
      ]
    });
  }

  async updateStatus(id, data){
    const clips = await this._getById(id);
    await clips.update(data); 
    return this.getDataWithRelation(id);
  }

  getUniqueMoveTotalCount(videoId){
    return this.model.findAll({
      where: {
        videoId: videoId,
        move: {
          [Op.ne]: ''
        }
      },
      attributes: [
        'move',
        [sequelize.literal('COUNT("move")'), 'totalCount'],
        [sequelize.literal('COUNT("move") FILTER (WHERE winner = \'yes\')'), 'totalWinCount'],
      ],
      group: ['ClipModel.move']
    })
  }

  getUniqueShotResultTotalCount(params){
    return this.model.findAll({
      where: {
        ...params, 
        shotResult: {
          [Op.ne]: ''
        }
      },
      attributes: [
        ['shotResult', 'name'],
        [sequelize.literal('COUNT("shotResult")'), 'total']
      ],
      group: ['ClipModel.shotResult']
    });
  }













  async getMatchReports(params){
    delete params.userId;
    //console.log('Match Report PARAMS : ', params);
    Object.keys(params).forEach((key) => (params[key] == null || params[key] == '') && delete params[key]);
    //console.log('Match Report removed PARAMS : ', params);
    let res = await Promise.all([
      this.model.findAll({
        where: {
          videoId: params.videoId,
          move: {
            [Op.ne]: ''
          }
        },
        attributes: [
          'move',
          [sequelize.literal('COUNT("move")'), 'totalCount'],
          [sequelize.literal('COUNT("move") FILTER (WHERE winner = \'yes\')'), 'totalWinCount'],
        ],
        group: ['ClipModel.move']
      }),
      // .map( data => {
      //   data = JSON.parse(JSON.stringify(data));
      //   let nameVal = `${(data.move !== 'return') ? data.move+' serve' : data.move} pts won`;
      //   let statResult = Number(data.totalWinCount) / Number(data.totalCount) * 100;
      //   return {
      //     name: nameVal,
      //     stats: statResult
      //   };
      // }),
      this.model.findAll({
        where: {
          ...params, 
          shotResult: {
            [Op.ne]: ''
          }
        },
        attributes: [
          'shotResult',
          [sequelize.literal('COUNT("shotResult")'), 'totalCount']
        ],
        group: ['ClipModel.shotResult']
      }).map( data => {
        data = JSON.parse(JSON.stringify(data));
        return {
          name: data.shotResult,
          total: Number(data.totalCount)
        }
      })
    ]);
     
     let clipTotalResult = res[0];
     let initialValue= {
       return : {total : 0, totalWin : 0},
        first : {total : 0, totalWin : 0},
        second : {total : 0, totalWin : 0},
     }
     clipTotalResult.forEach(result => {
      switch (result.dataValues.move) {
        case '1st':
          initialValue.first.total = Number(result.dataValues.totalCount);
          initialValue.first.totalWin = Number(result.dataValues.totalWinCount);
        break;
        case '2nd':
          initialValue.second.total = Number(result.dataValues.totalCount);
          initialValue.second.totalWin = Number(result.dataValues.totalWinCount);
        break;
        case 'return':
          initialValue.return.total = Number(result.dataValues.totalCount);
          initialValue.return.totalWin = Number(result.dataValues.totalWinCount);
        break;
      
        default:
          break;
      }
     });
     
     let doubleFaultCount =  0;
     res[1].forEach(element => {
       if(element.name == pointsResult.DOUBLE_FAULT){
        doubleFaultCount = element.total;
       }
     });

     const statResult = [
      {
        name: "1st serve %",
        stats: Math.round(Number(initialValue.first.total) / (Number(initialValue.first.total) + Number(initialValue.second.total)) * 100)
      },
      {
        name: "2nd serve %",
        stats: Math.round(( Number(initialValue.second.total) - Number(doubleFaultCount)) / Number(initialValue.second.total) * 100)
      },
      {
        name: "1st serve pts won",
        stats: Math.round(Number(initialValue.first.totalWin) / Number(initialValue.first.total) * 100 )
      },
      {
        name: "2nd serve pts won",
        stats: Math.round(Number(initialValue.second.totalWin) / Number(initialValue.second.total) * 100)
      },
      {
        name: "return pts won",
        stats: Math.round(Number(initialValue.return.totalWin) / Number(initialValue.return.total) * 100)
      }
    ];

     console.log('RESULT INITIAL :', statResult);

    return {
      data: mergeArr(statSkeleton,statResult,'name'),
      pointResults: mergeArr(pointResultsSkeleton,res[1],'name')
    };
  }


  async getProgressReports(params){
    let userId = params.userId;
      delete params.userId;

    let progressData = await this.VideoModel.findAll({
      where: {
        userId : userId,
        matchType: 'match'
      },
      attributes : ['id', 'videoName', 'matchType']
    }).map(async(videoData, index) => {
      
      return {
        label : `${videoData.matchType.charAt(0).toUpperCase()}${videoData.matchType.slice(1)} #${index + 1}`,
        ...await this.getMatchReports({videoId: videoData.id, ...params })
      }
    })
    
    let mergedData = await mergeData(progressData);
    let pointResultsData = [
      {
        name: 'Aces/Double Faults',
        scores: await getRatio(mergedData.pointResults.find( d => d.name === pointsResult.ACE).total, mergedData.pointResults.find( d => d.name === pointsResult.DOUBLE_FAULT).total)
      },
      {
        name: 'Winners/Unforced Errors',
        scores: await getRatio(mergedData.pointResults.find( d => d.name === pointsResult.WINNER).total, mergedData.pointResults.find( d => d.name === pointsResult.UNFORCED_ERROR).total)
      }
    ];
   

    return {
      consistency : {
        label : mergedData.labels,
        data : mergedData.data
      },
      aggressiveness : {
        label : mergedData.labels,
        data : pointResultsData
      },
    }
  }

}

module.exports = ClipRepository;

