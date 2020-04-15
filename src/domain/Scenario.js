const { attributes } = require('structure');

const Scenario = attributes({
  // Add atttributes here
  activity: {
    type: String,
    required: true
  }, 
  subActivityOne: {
    type: String,
    required: true
  }, 
  subActivityTwo: {
    type: String,
    required: true
  }, 
  subActivityThree: {
    type: String,
    empty: true
  },
  subActivityFour: {
    type: String,
    empty: true
  },
  subActivityFive: {
    type: String,
    empty: true
  }
})(class Scenario {});
module.exports = Scenario;
