/* eslint-disable no-undef */

const { BaseRepository } = require('@amberjs/core');

class PlayerRepository extends BaseRepository {
  constructor({ PlayerModel }) {
    super(PlayerModel);
  }

  async upsert(data) {
    return await this.model.upsert(data);
  }
}

module.exports = PlayerRepository;

