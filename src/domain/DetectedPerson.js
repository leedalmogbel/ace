const { attributes } = require('structure');

const Person = attributes({
  id: Number,
  clipId: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  centroid: {
    type: String,
    required: true
  }
})(class PersonValue { });

const Persons = attributes({
  personImages: {
    required: true,
    type: Array,
    minLength: 1,
    unique: true,
    itemType: Person
  },
})(class Persons {});

//module.exports = IntentValue;
module.exports = {
  Persons
};
