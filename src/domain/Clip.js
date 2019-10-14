const { attributes } = require('structure');

const Clip = attributes({
  // Add atttributes here
  id: Number,
  videoId: Number,
  clipName: String,
  set: Number,
  game: Number,
  serveIn: Boolean,
  serveWon: Boolean,
  startTime: String,
  endTime: String,
  currentSetScore: String,
  currentGameScore: String,
  shotType: String,
  moveDirection: String,
  hitSpot: String,
  shotResult: String,
  errorType: String,
  spin: String,
  shotDirection: String,
  speed: String,
  createdAt: Date,
  updatedAt: Date,
})(class Clip {
  // Add validation functions below
  // e.g.:
  //
  // isLegal() {
  //   return this.age >= User.MIN_LEGAL_AGE;
  // }
});

// Add constants below
// e.g.:
//
// User.MIN_LEGAL_AGE = 21;

module.exports = Clip;
