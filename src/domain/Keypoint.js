const { attributes } = require('structure');

const Keypoint = attributes({
  // Add atttributes here
  id: Number,
  clipId: Number,
  clipPath: String,
  createdAt: Date,
  updatedAt: Date,
})(class Keypoint {
  // Add validation functions below
  // e.g.:
  //
  // isLegal() {
  //   return this.age >= User.MIN_LEGAL_AGE;
  // }
  clipOwnerId() {
    return this.clipId === Keypoint.clipId; 
  }
});

const KeypointStatus = attributes({
  clipPersonId : {
    type: Number,
    required: true
  },
  scenarioId : {
    type: Number,
    required: true
  }
})(class KeypointStatus {});


const KeypointExtraction = attributes({
  clipPersonId : {
    type: Number,
    required: true
  },
  scenarioId : {
    type: Number,
    required: true
  },
  userId : {
    type: Number,
    required: true
  }
})(class KeypointExtraction {});



module.exports = {
  Keypoint,
  KeypointStatus,
  KeypointExtraction
};
