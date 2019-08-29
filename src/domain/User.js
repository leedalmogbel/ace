const { attributes } = require('structure');

const User = attributes({
  // Add atttributes here
  // id: Number,
  // name: String,
  // createdAt: Date,
  // updatedAt: Date,
  id: Number,
  firstName: String,
  lastName: String,
  email: String,
  is_admin: Boolean
})(class User {
  // Add validation functions below
  // e.g.:
  //
  // isLegal() {
  //   return this.age >= User.MIN_LEGAL_AGE;
  // }
  isAdmin() {
    return (this.user_type === "admin") ? User.type_admin : User.type_normal;
  }


});

// Add constants below
// e.g.:
//
// User.MIN_LEGAL_AGE = 21;
User.type_admin = "admin"
User.type_normal = "normal"
module.exports = User;
