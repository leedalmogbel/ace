const { attributes } = require('structure');

const Practice = attributes({
  // Add atttributes here
  // id: Number,
  // name: String,
  // createdAt: Date,
  // updatedAt: Date,
})(class Practice {
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

module.exports = Practice;
