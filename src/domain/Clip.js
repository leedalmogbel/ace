const { attributes } = require('structure');

const Clip = attributes({
  // Add atttributes here
  id: Number,
  videoId: Number,
  clipName: String,
  set: Number,
  game: Number,
  startTime: String,
  endTime: String,
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
  goldStandard: Boolean,
  forInference: Boolean,
  standardMovement: String,
  standardShotType: String
})(class Clip {});

const SetStandard = attributes({
  goldStandard: {
    type: Boolean,
    required: true
  },
  standardMovement: {
    type: String,
    required: true
  },
  standardShotType: {
    type: String,
    required: true
  },
})(class SetStandard {});
module.exports = {
  Clip,
  SetStandard
};
