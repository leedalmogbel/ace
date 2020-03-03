
const { BaseRepository } = require('@amberjs/core');
const sequelize = require('sequelize');
const Op = require('sequelize').Op;

const mergeArr = (origData, newData, key) => origData.filter( aa => ! newData.find ( bb => aa[key] === bb[key]) ).concat(newData);
const statSkeleton = [
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
    name: "ace",
    total: 0
  },
  {
    name: "double_fault",
    total: 0
  },
  {
    name: "winner",
    total: 0
  },
  {
    name: "unforced_error",
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
      }).map( data => {
        data = JSON.parse(JSON.stringify(data));
        return {
          name: `${(data.move !== 'return') ? data.move+' serve' : data.move} pts won`,
          stats: Number(data.totalWinCount) / Number(data.totalCount) * 100
        };
      }),
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
     
    return {
      data: mergeArr(statSkeleton,res[0],'name'),
      pointResults: mergeArr(pointResultsSkeleton,res[1],'name')
    };
  }


  async getProgressReports(params){
    let userId = params.userId;
      delete params.userId;

    let progressData = await this.VideoModel.findAll({
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
        scores: await getRatio(mergedData.pointResults.find( d => d.name === 'ace').total, mergedData.pointResults.find( d => d.name === 'double_fault').total)
      },
      {
        name: 'Winners/Unforced Errors',
        scores: await getRatio(mergedData.pointResults.find( d => d.name === 'winner').total, mergedData.pointResults.find( d => d.name === 'unforced_error').total)
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

