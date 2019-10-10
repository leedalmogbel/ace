const Match = require('src/domain/Match');
const Practice = require('src/domain/Practice'); 

module.exports.type = (data) => {
  if (data.matchType === 'match') {
    const match = new Match(data);
    return match;
  } else if (data.matchType === 'practice') {
    const practice = new Practice(data);
    return practice;
  }
};