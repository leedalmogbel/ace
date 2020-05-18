
const { BaseRepository } = require('@amberjs/core');

class TennisRepository extends BaseRepository {
  constructor({ TennisModel }) {
    super(TennisModel);
  }
}

module.exports = TennisRepository;

