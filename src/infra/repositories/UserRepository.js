
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

  async insertEmail (data) {
    const newData = await this.model.upsert({
      name: data.name,
      email: data.email,
      googleUserId: data.googleUserId,
    },{
      returning: true
    })

    return newData;
  }

  async createEmail (data) {
    const userData = this.getByEmail(data.email);
    if (userData.id != null) {
      return await this.insertEmail(data);
    } else {
      const newEmail = await this.model.create(data);
      return newEmail;
    }
  }
}

module.exports = UserRepository;

