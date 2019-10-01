const { BaseRepository } = require('@amberjs/core');

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
        userType: data.userType,
        googleUserId: data.googleUserId
      }
    });
  }
}

module.exports = UserRepository;

