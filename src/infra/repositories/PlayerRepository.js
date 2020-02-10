/* eslint-disable no-undef */

const { BaseRepository } = require('@amberjs/core');

class PlayerRepository extends BaseRepository {
  constructor({ PlayerModel }) {
    super(PlayerModel);
  }
}

module.exports = PlayerRepository;

