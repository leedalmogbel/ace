const { attributes } = require('structure');

const ClipTag = attributes({
  // Add atttributes here
  clipId: Number,
  createdAt: Date,
  updatedAt: Date,
})(class ClipTag {
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

module.exports = ClipTag;
