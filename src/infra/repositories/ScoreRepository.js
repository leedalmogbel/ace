
const { BaseRepository } = require('@amberjs/core');

class ScoreRepository extends BaseRepository {
  constructor({ ScoreModel }) {
    super(ScoreModel);
  }
}

module.exports = ScoreRepository;

