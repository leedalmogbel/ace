const { BaseRepository } = require('@amberjs/core');

class UserRepository extends BaseRepository {
  constructor({ UserModel, PlayerRepository }) {
    super(UserModel);
    this.PlayerRepository = PlayerRepository;
  }

  async add(data) {
    return await this.model.create(data);
  }

  async upsert(data) {
    return await this.model.upsert(data);
  }

  async subscribed(id, data) {
    return this.model.upsert({
      id: id,
      subscribed: data.subscribed
    },
    {
      returning: true
    });
  } 

  getByEmail(email) {
    return this.model.findOne({
      where: {
        email: email
      },
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt'
        ],
      }
    });
  }
}

module.exports = UserRepository;

