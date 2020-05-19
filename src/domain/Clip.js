const { attributes } = require('structure');

const Clip = attributes({
  // Add atttributes here
  videoId: {
    type: Number,
    required: true
  },
  clipName: String,
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
  shotDirection: String,
  comments: {
    type: String,
    empty: true
  },
  clipType: String,
  errorLocation: String,
  winner: String,
  move: String,
  rallyLength: {
    type: String,
    empty: true
  },
  createdBy: Number,
  updatedBy: Number
})(class Clip {});

module.exports = {
  Clip
};
