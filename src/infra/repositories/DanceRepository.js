
const { BaseRepository } = require('@amberjs/core');

class DanceRepository extends BaseRepository {
  constructor({ DanceModel }) {
    super(DanceModel);
  }
}

module.exports = DanceRepository;

