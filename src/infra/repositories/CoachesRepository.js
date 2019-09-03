
const { BaseRepository } = require('@brewery/core');

class CoachesRepository extends BaseRepository {
  constructor({ CoachesModel }) {
    super(CoachesModel);
  }
}

module.exports = CoachesRepository;

