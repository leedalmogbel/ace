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
  currentSetScore: String,
  currentGameScore: String,
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
  comments: String,
  createdAt: Date,
  updatedAt: Date,
  clipType: {
    type: String,
    required: true,
    equal: ['basic', 'forAnalytics', 'forGoldStandard']
  },
})(class Clip {});

module.exports = {
  Clip
};
