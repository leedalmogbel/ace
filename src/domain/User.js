const { attributes } = require('structure');

const User = attributes({
  // Add atttributes here
  // id: Number,
  // name: String,
  // createdAt: Date,
  // updatedAt: Date,
  id: Number,
  name: String,
  email: {
    type: String,
    required: true
  },
  userType: String,
  isAdmin: Boolean
})(class User {
  // Add validation functions below
  // e.g.:
  //
  // isLegal() {
  //   return this.age >= User.MIN_LEGAL_AGE;
  // }
  isAdmin() {
    return this.userType === "admin" ? User.typeAdmin : User.typePlayer || User.typeCoach;
  }

});

// Add constants below
// e.g.:
//
// User.MIN_LEGAL_AGE = 21;
User.typeAdmin = "admin"
User.typePlayer = "player"
User.typeCoach = "coach"
module.exports = User;
