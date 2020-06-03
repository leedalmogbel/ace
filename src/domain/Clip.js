const { attributes } = require('structure');

const Clip = attributes({
  // Add atttributes here
  videoId: {
    type: Number,
    required: true
  },
  clipName: String,
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  shotType: String,
  hitSpot: String,
  shotResult: String,
  shotDirection: String,
  comments: {
    type: String,
    empty: true
  },
  clipType: String,
  errorType: String,
  winner: String,
  move: String,
  rallyLength: {
    type: String,
    empty: true
  },
  createdBy: {
    type: Number,
    nullable: true
  },
  updatedBy: {
    type: Number,
    nullable: true
  }
})(class Clip {});

const UpdateClip = attributes({
  // Add atttributes here
  clipName:{
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  updatedBy: {
    type: Number,
    nullable: true
  }
})(class UpdateClip {});


module.exports = {
  Clip,
  UpdateClip
};
