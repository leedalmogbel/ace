const { attributes } = require('structure');

const Match = attributes({
  // Add atttributes here
  videoId: Number,
  type: String,
  tournament: String,
  result: String,
})(class Match {
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

module.exports = Match;
