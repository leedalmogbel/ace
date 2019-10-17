const { attributes } = require('structure');

const Player = attributes({
  // Add atttributes here
  id: Number,
  userId: Number,
  coachId: Number,
  gender: String,
  height: Number,
  weight: Number,
  dominantHand: String,
  matchCounter: Number,
  practiceCounter: Number,
})(class Player {
  // Add validation functions below
  // e.g.:
  //
  // isLegal() {
  //   return this.age >= User.MIN_LEGAL_AGE;
  // }
  isValid() {
    return this.userId != Player.coachId;
  }
});

// Add constants below
// e.g.:
//
// User.MIN_LEGAL_AGE = 21;

module.exports = Player;
