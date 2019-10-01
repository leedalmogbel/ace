const { BaseRepository } = require('@amberjs/core');

class UserRepository extends BaseRepository {
  constructor({ UserModel }) {
    super(UserModel);
  }

  async createEmail (data) {
    const year = new Date().getFullYear();
    const userId = parseInt(`${year}${Math.floor(Math.random()* 999999) + 100000}`);
    return await this.model.findOrCreate({
      where: {
        email: data.email,
      },
      defaults: {
        id: userId,
        name: data.name,
        userType: data.userType,
        googleUserId: data.googleUserId
      }
    });
  }
}

module.exports = UserRepository;

