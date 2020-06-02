const { attributes } = require('structure');

const Player = attributes({
  userId: {
    type: Number,
    nullable: true
  },
  name: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    empty: true,
    nullable: true
  }
})(class Player { });

const Video = attributes({
  // Add atttributes here
  userId: {
    type: Number,
    required: true
  },
  videoName: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  subActivityOne: {
    type: String,
    required: true
  },
  matchType: String, //drill or match
  location: String,
  date: String,
  time: String,
  autoCreateClip : {
    type: Boolean,
    nullable: true
  }, 
  source:String,
  users: {
    required: true,
    type: Array,
    minLength: 1,
    unique: true,
    itemType: Player
  },
  objective: String,
  createdBy: {
    type: Number,
    nullable: true
  },
  updatedBy: {
    type: Number,
    nullable: true
  }
})(class Video {});

const VideoId = attributes({
  // Add atttributes here
  videoId: {
    type: Number,
    required: true
  }
})(class VideoId {});

const Tennis = attributes({
  // Add atttributes here
  tournament: {
    type: String,
    required: true
  },
  gameType: {
    type: String,
    required: true
  },
  setType: {
    type: String,
    required: true
  }
})(class Tennis {});

const TennisDrill = attributes({
  // Add atttributes here
  tournament: {
    type: String,
    empty: true
  },
  gameType: {
    type: String,
    empty: true
  },
  setType: {
    type: String,
    empty: true
  }
})(class TennisDrill {});

const Dance = attributes({
  // Add atttributes here
  scenarioId: {
    type: Number,
    required: true
  }
})(class Dance {});


module.exports = {
  Video,
  VideoId,
  Dance,
  Tennis,
  TennisDrill
};
