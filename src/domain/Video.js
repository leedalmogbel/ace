const { attributes } = require('structure');

const Video = attributes({
  // Add atttributes here
  id: Number,
  userId: Number,
  videoName: String,
  createdAt: Date,
  updatedAt: Date,

})(class Video {
  // Add validation functions below
  // e.g.:
  //
  // isLegal() {
  //   return this.age >= User.MIN_LEGAL_AGE;
  // }
  videoOwnerId() {
    return this.userId === Video.userId; 
  }
});

// Add constants below
// e.g.:
//
// User.MIN_LEGAL_AGE = 21;
// Video.userId = async (id) => {

// };
module.exports = Video;