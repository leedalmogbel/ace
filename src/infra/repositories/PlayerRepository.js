/* eslint-disable no-undef */

const { BaseRepository } = require('@brewery/core');

class PlayerRepository extends BaseRepository {
  constructor({ PlayerModel }) {
    super(PlayerModel);
  }

  async createPlayer(userId, data, res) {
    const player = this.model.create({
      userId: userId,
      gender: data.gender,
      height: data.height,
      weight: data.weight,
      dominantHand: data.dominantHand,
      UserModel: {
        name: data.name
      },
      include: [{
        model: UserModel,
        association: this.model.UserModel
      }]
    });
    return res.status(200).send(player);
  }
}

module.exports = PlayerRepository;

