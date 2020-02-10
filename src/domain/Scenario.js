const { attributes } = require('structure');

const Scenario = attributes({
  // Add atttributes here
  scenario: {
    type: String,
    required: true
  }, 
  shotType: {
    type: String,
    required: true
  },
  movement: {
    type: String,
    empty: true
  },
})(class Scenario {});
module.exports = Scenario;