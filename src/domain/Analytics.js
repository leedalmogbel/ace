const { attributes } = require('structure');

const VideoId = attributes({
  videoId: {
    type: Number,
    required: true
  },
})(class VideoId {});

module.exports = {
  VideoId
};
