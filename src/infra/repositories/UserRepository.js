const { BaseRepository } = require('@brewery/core');

class UserRepository extends BaseRepository {
  constructor({ UserModel }) {
    super(UserModel);
  }

  async createEmail (data) {
    return await this.model.findOrCreate({
      where: {
        email: data.email,
      },
      defaults: {
        name: data.name,
        googleUserId: data.googleUserId
      }
    });
  }
}

module.exports = UserRepository;

