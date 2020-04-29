const { attributes } = require('structure');

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
  path: String,
  status: String,
  opponent: String,
  matchType: String,
  gameType: String,
  location: String,
  date: String,
  time: String,
  createdAt: Date,
  updatedAt: Date,
  autoCreateClip : {
    type: Boolean,
    nullable: true
  }

})(class Video {
  videoOwnerId() {
    return this.userId === Video.userId; 
  }
});

const VideoId = attributes({
  // Add atttributes here
  videoId: {
    type: Number,
    required: true
  }
})(class VideoId {});
module.exports = {
  Video,
  VideoId
};
