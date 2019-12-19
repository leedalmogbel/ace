const { attributes } = require('structure');

const Score = attributes({
  // Add atttributes here
  clipId: {
    type: Number,
    required: true
  },
  standardId: {
    type: Number,
    required: true
  },
  testId: {
    type: Number,
    required: true
  },
  score: {
    type: String,
    required: true
  },
})(class Score {});
module.exports = Score;
