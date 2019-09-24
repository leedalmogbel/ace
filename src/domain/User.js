const { attributes } = require('structure');

const User = attributes({
  // Add atttributes here
  id: Number,
  name: String,
  email: {
    type: String,
    required: true
  },
  userType: String,
  googleUserId: String
})(class User {

});

// Add constants below
// e.g.:
//
// User.MIN_LEGAL_AGE = 21;

module.exports = User;
