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
  isAdmin: Boolean,
  googleUserId: Number
})(class User {
  // Add validation functions below
  // e.g.:
  //
  // isLegal() {
  //   return this.age >= User.MIN_LEGAL_AGE;
  // }
  isAdmin() {
    const validation = this.userType === "admin" ? User.typeAdmin : this.isCoach;
    if (User.typeAdmin == true) {User.isAdmin = true;}
   
    return validation, User.isAdmin;
  }

  isCoach() {
    return type = this.userType === "coach" ? User.typeCoach : this.isPlayer;
  }

  isPlayer() {
    return type = this.userType === "player" ? User.typePlayer : this.isAdmin;
  }

});

// Add constants below
// e.g.:
//
// User.MIN_LEGAL_AGE = 21;
User.isAdmin = false
User.typeAdmin = "admin"
User.typePlayer = "player"
User.typeCoach = "coach"

module.exports = User;
