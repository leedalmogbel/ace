const { attributes } = require('structure');

const Whitelist = attributes({
  email: {
    type: String,
    required: true
  },
})(class Whitelist {});
module.exports = Whitelist;
