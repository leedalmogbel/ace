
const { BaseRepository } = require('@amberjs/core');
const sequelize = require('sequelize');
const Op = require('sequelize').Op;

const mergeArr = (origData, newData, key) => origData.filter( aa => ! newData.find ( bb => aa[key] === bb[key]) ).concat(newData);
const statSkeleton = [
  {
    name: "1st serve",
    stats: 0
  },
  {
    name: "2nd serve",
    stats: 0
  },
  {
    name: "return",
    stats: 0
  }
];

const pointResultsSkeleton =  [
  {
    name: "ace",
    total: 0
  },
  {
    name: "double fault",
    total: 0
  },
  {
    name: "winner",
    total: 0
  },
  {
    name: "unforced error",
    total: 0
  }
];


const mergeData = (input) => input.reduce((acc, val) => {
  const { label, data, pointResults } = val;
  acc.labels.push(label);
  // Merge Data
  data.forEach(({ name, stats }) => {
    const matchedSetIndex = acc.data.findIndex(accData => accData.name === name);
    if (matchedSetIndex !== -1) {
      acc.data[matchedSetIndex].stats.push(stats);
    } else {
      acc.data.push({
        name,
        stats: [stats]
      });
    }
  });

  // Merge pointResults
  pointResults.forEach(({ name, total }) => {
    console.log('NAME : ', name)
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
    console.log(`${data} / ${secondArr[index]}`);
    let ratio = Number(data) / Number(secondArr[index]);
    console.log('RATIO :',ratio)
    return (secondArr[index] == 0) ? 0 : ratio;
  })
}

class AnalyticsRepository extends BaseRepository {
  constructor({ ClipModel, PlayerModel, VideoModel, TypeMatchModel }) {
    super();
    this.ClipModel = ClipModel;
    this.PlayerModel = PlayerModel;
    this.VideoModel = VideoModel;
    this.TypeMatchModel = TypeMatchModel;


  }
  async testCount(data) {
    var whereFilterStatement = {};
    if (data.videoId) {
      whereFilterStatement.videoId = data.videoId;
    }
    if (data.set) {
      whereFilterStatement.set = data.set;
    }
    return this.ClipModel.findAll({
      where: whereFilterStatement,
      attributes: [
        [sequelize.fn('sum', sequelize.cast({'shotType':'forehand'}, 'integer')), 'forehand'],
        [sequelize.fn('sum', sequelize.cast({'shotType':'backhand'}, 'integer')), 'backhand'],
        [sequelize.fn('sum', sequelize.cast({'shotType':'volley'}, 'integer')), 'volley'],
        [sequelize.fn('sum', sequelize.cast({'shotType':'overhead'}, 'integer')), 'overhead'],
        [sequelize.fn('sum', sequelize.cast({'shotResult':'ace'}, 'integer')), 'ace'],
        [sequelize.fn('sum', sequelize.cast({'shotResult':'winner'}, 'integer')), 'winner'],
        [sequelize.fn('sum', sequelize.cast({'shotResult':'double fault'}, 'integer')), 'doubleFault'],
        [sequelize.fn('sum', sequelize.cast({'shotResult':'unforced error'}, 'integer')), 'unforcedError'],
        [sequelize.fn('sum', sequelize.cast({'shotResult':'forced error'}, 'integer')), 'forcedError'],
        [sequelize.fn('sum', sequelize.cast({'shotResult':'smartPattern'}, 'integer')), 'smartPattern'],
        [sequelize.fn('sum', sequelize.cast({'shotResult':'others'}, 'integer')), 'others'],
        [sequelize.fn('sum', sequelize.cast({'hitSpot':'behind baseline'}, 'integer')), 'behindBaseline'],
        [sequelize.fn('sum', sequelize.cast({'hitSpot':'on baseline'}, 'integer')), 'onBaseline'],
        [sequelize.fn('sum', sequelize.cast({'hitSpot':'inside baseline'}, 'integer')), 'insideBaseline'],
        [sequelize.fn('sum', sequelize.cast({'hitSpot':'inside service line'}, 'integer')), 'insideServiceLine'],
        [sequelize.fn('sum', sequelize.cast({'errorType':'into net'}, 'integer')), 'intoNet'],
        [sequelize.fn('sum', sequelize.cast({'errorType':'wide'}, 'integer')), 'wide'],
        [sequelize.fn('sum', sequelize.cast({'errorType':'long'}, 'integer')), 'long'],
        [sequelize.fn('sum', sequelize.cast({'errorType':'NA'}, 'integer')), 'NA'],
        [sequelize.fn('sum', sequelize.cast({'spin':'lob'}, 'integer')), 'lob'],
        [sequelize.fn('sum', sequelize.cast({'spin':'topspin'}, 'integer')), 'topspin'],
        [sequelize.fn('sum', sequelize.cast({'spin':'flat'}, 'integer')), 'flat'],
        [sequelize.fn('sum', sequelize.cast({'spin':'underspin'}, 'integer')), 'underspin'],
        [sequelize.fn('sum', sequelize.cast({'spin':'drop shot'}, 'integer')), 'dropShot'],
        [sequelize.fn('sum', sequelize.cast({'shotDirection':'cross-court'}, 'integer')), 'crossCourt'],
        [sequelize.fn('sum', sequelize.cast({'shotDirection':'down-the-line'}, 'integer')), 'downTheLine'],
        [sequelize.fn('sum', sequelize.cast({'shotDirection':'inside-out'}, 'integer')), 'insideOut'],
        [sequelize.fn('sum', sequelize.cast({'shotDirection':'inside-in'}, 'integer')), 'insideIn'],
        [sequelize.fn('sum', sequelize.cast({'speed':'too hard'}, 'integer')), 'tooHard'],
        [sequelize.fn('sum', sequelize.cast({'speed':'too soft'}, 'integer')), 'tooSoft'],

        
        // [(, 'backhand')],
        // [this.ClipModel.sequelize.where(this.ClipModel.sequelize.col("filter"), 'backhand')], 
        // [this.ClipModel.sequelize.where(this.ClipModel.sequelize.col("shotType"), 'backhand')]
      ],
      raw: true
    });
    // .then(clips => {
    //   return clips.reduce((acc, {set, shotType, shotResult}) => {
    //     acc[`set${set}`].push({
    //       shotType,
    //       shotResult
    //     });
    //     return acc;
    //   }, {
    //     set1: [],
    //     set2: [],
    //     set3: []
    //   });
    // });
  } 

  async getCounts(id) {
    const counts = this.ClipModel.count({
      where: {
        videoId: id,
        // shotType: 'backhand'
      }
    });
    const findCount = this.ClipModel.findAndCountAll({
      where: {
        videoId: id,
      },
      attributes: [
        'set',
        'game',
        'shotType',
        'hitSpot',
        'shotResult',
        'errorType',
        'spin',
        'shotDirection',
        'speed'
      ]
    });
    return {
      counts,
      findCount
    }
  }

  async getVideoAnalytics(id, set) {
    return this.ClipModel.findAll({
      where: {
        videoId: id,
        set: set,
      },
      attributes: [
        'set',
        'game',
        'shotType',
        'hitSpot',
        'shotResult',
        'errorType',
        'spin',
        'shotDirection',
        'speed'
      ]
    });
  }

  async getMatchReports(params){
    console.log('PARAMS : ', params);
    
    let res = await Promise.all([
      this.ClipModel.findAll({
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
      }).map( data => {
        data = JSON.parse(JSON.stringify(data));
        return {
          name: data.move,
          stats: Number(data.totalWinCount) / Number(data.totalCount) * 100
        };
      }),
      this.ClipModel.findAll({
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
     
    return {
      data: mergeArr(statSkeleton,res[0],'name'),
      pointResults: mergeArr(pointResultsSkeleton,res[1],'name')
    };
  }

  async getProgressReports(params){
    let userId = params.userId;
      delete params.userId;

    let progressData = this.VideoModel.findAll({
      where: {
        userId : userId
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
        scores: await getRatio(mergedData.pointResults.find( d => d.name === 'ace').total, mergedData.pointResults.find( d => d.name === 'double fault').total)
      },
      {
        name: 'Winners/Unfored Errors',
        scores: await getRatio(mergedData.pointResults.find( d => d.name === 'winner').total, mergedData.pointResults.find( d => d.name === 'unforced error').total)
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

module.exports = AnalyticsRepository;

