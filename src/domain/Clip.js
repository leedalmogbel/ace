const { attributes } = require('structure');

const Clip = attributes({
  // Add atttributes here
  id: Number,
  videoId: {
    type: Number,
    required: true
  },
  clipName: String,
  set: Number,
  game: Number,
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  shotType: String,
  hitSpot: String,
  shotResult: String,
  errorType: String,
  shotDirection: String,
  comments: {
    type: String,
    empty: true
  },
  clipType: {
    type: String,
    //required: true,
    equal: ['basic', 'forAnalytics', 'forGoldStandard']
  },
  winner: String,
  move: String,
  rallyLength: {
    type: String,
    empty: true
  }
})(class Clip {});

module.exports = {
  Clip
};
