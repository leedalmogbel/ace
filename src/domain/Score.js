const { attributes } = require('structure');
const Scores = attributes({
  score: {
    type: Array,
    required: true
  },
  keypointMap: {
    type: String,
    required: true
  }
})(class Scores {});

const Score = attributes({
  // Add atttributes here
  clipId: {
    type: Number,
    required: true
  },
  clipPersonId: {
    type: Number,
    required: true
  },
  score: {
    required: true,
    type: Array,
    minLength: 1,
    unique: true,
    itemType: Scores
  }
})(class Score {});
module.exports = Score;
