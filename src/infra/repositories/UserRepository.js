const User = require('src/domain/User');
const { BaseRepository } = require('@brewery/core');

class UserRepository extends BaseRepository {
  constructor({ UserModel }) {
    super(UserModel);
  }

  async createEmail (data) {
    const user = new User(data);
    user.isAdminAuthenticate();
    return await this.model.findOrCreate({
      where: {
        name: data.name,
        email: data.email,
        userType: data.userType,
        googleUserId: data.googleUserId
      },
      defaults: {
        isAdmin: data.isAdmin,
      }
    });
  }
}

module.exports = UserRepository;

