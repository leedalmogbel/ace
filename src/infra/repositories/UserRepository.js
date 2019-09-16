
const { BaseRepository } = require('@brewery/core');

class UserRepository extends BaseRepository {
  constructor({ UserModel }) {
    super(UserModel);
  }

  async getByEmail(email) {
    const getEmail = await this.model.findOne({
      where: {
        email: email,
      }
    });

    return getEmail;
  }

  async updateByEmail(email) {
    const updateEmail = await this.model.update({
      where: {
        email: email,
      }
    });

    return updateEmail;
  }

  async createEmail (data) {
    const userData = this.getByEmail(data.email);
    if (userData.id == null) {
      const newEmail = await this.model.create(data);
      return newEmail;
    } else {
      return userData;
    }
  }
}

module.exports = UserRepository;

