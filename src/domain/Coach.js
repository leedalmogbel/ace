const { attributes } = require('structure');

const Coach = attributes({
  // Add atttributes here
  // id: Number,
  // name: String,
  // createdAt: Date,
  // updatedAt: Date,
  id: Number,
  userId: Number,
  coachName: String
})(class Coach {
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
module.exports = Coach;
