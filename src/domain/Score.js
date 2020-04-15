const { attributes } = require('structure');
const Scores = attributes({
  score: {
    type: Number,
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
  scenarioId: {
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


const GenerateScore = attributes({
  // Add atttributes here
  clipId: {
    type: Number,
    required: true
  },
  clipPersonId: {
    type: Number,
    required: true
  },
  scenarioId: {
    type: Number,
    required: true
  },
  userId: {
    type: Number,
    required: true
  }
})(class GenerateScore {});



module.exports = {
  GenerateScore,
  Score
};
