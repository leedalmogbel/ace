const { attributes } = require('structure');

const Keypoint = attributes({
  // Add atttributes here
  id: Number,
  clipId: Number,
  clipPath: String,
  createdAt: Date,
  updatedAt: Date,
})(class Keypoint {
  // Add validation functions below
  // e.g.:
  //
  // isLegal() {
  //   return this.age >= User.MIN_LEGAL_AGE;
  // }
  clipOwnerId() {
    return this.clipId === Keypoint.clipId; 
  }
});

// Add constants below
// e.g.:
//
// User.MIN_LEGAL_AGE = 21;

module.exports = Keypoint;
