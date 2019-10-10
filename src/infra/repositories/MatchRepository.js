
const { BaseRepository } = require('@amberjs/core');

class MatchRepository extends BaseRepository {
  constructor({ TypeMatchModel }) {
    super(TypeMatchModel);
  }
}

module.exports = MatchRepository;

