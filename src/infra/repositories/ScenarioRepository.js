
const { BaseRepository } = require('@amberjs/core');

class ScenarioRepository extends BaseRepository {
  constructor({ ScenariosModel }) {
    super(ScenariosModel);
  }

  async getAll() {
    return this.model.findAll({
      attributes: [
        'id',
        'scenario'
      ]
    });
  }
}

module.exports = ScenarioRepository;

