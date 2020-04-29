const { attributes } = require('structure');

const User = attributes({
  // Add atttributes here
  id: Number,
  name: String,
  email: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true,
    equal: ['coach', 'admin', 'player']
  },
  googleUserId: {
    type: String,
    empty: true
  },
  fbUserId: {
    type: String,
    empty: true
  },
  subscribed: Boolean
})(class User {});

const UserId = attributes({
  userId: {
    type: Number,
    required: true
  }
})(class User {});

module.exports = {
  User,
  UserId
};
