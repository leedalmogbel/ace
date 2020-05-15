const { attributes } = require('structure');

const User = attributes({
  // Add atttributes here
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  googleUserId: {
    type: String,
    empty: true
  },
  fbUserId: {
    type: String,
    empty: true
  }
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
