
const { BaseRepository } = require('@amberjs/core');

class ScenarioRepository extends BaseRepository {
  constructor({ ScenariosModel }) {
    super(ScenariosModel);
  }
}

module.exports = ScenarioRepository;

