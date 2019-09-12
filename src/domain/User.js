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

  /**
   * @return boolean
   */
  isAdminAuthenticate() {
    return this.userType === User.typeAdmin ?
      (this.isAdmin = true) : (this.userType === User.typeCoach) ?
        this.isAdmin : (this.userType === User.typePlayer) ? 
          this.isAdmin : User.errorMessage;
  }

  // isCoach() {
  //   return this.userType === User.typeCoach ? (this.isAdmin) : this.isPlayer;
  // }

  // isPlayer() {
  //   return this.userType === User.typePlayer ? this.isAdmin : console.error(status(400));
  // }

});

// Add constants below
// e.g.:
//
// User.MIN_LEGAL_AGE = 21;
User.errorMessage = 'Invalid user type';
User.typeAdmin = 'admin';
User.typePlayer = 'player';
User.typeCoach = 'coach';

module.exports = User;
