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
  currentSetScore: {
    type: String,
    empty: true
  },
  currentGameScore: {
    type: String,
    empty: true
  },
  shotType: String,
  moveDirection: String,
  hitSpot: String,
  shotResult: String,
  smartPattern: Boolean,
  extra: String,
  errorType: String,
  spin: String,
  shotDirection: String,
  speed: String,
  comments: {
    type: String,
    empty: true
  },
  createdAt: Date,
  updatedAt: Date,
  clipType: {
    type: String,
    //required: true,
    equal: ['basic', 'forAnalytics', 'forGoldStandard']
  },
  winner: String,
  move: String,
  end: {
    type: String,
    empty: true
  },
  rallyLength: String,
  opponentGameScore: String,
  opponentPointScore: String
})(class Clip {});

module.exports = {
  Clip
};
