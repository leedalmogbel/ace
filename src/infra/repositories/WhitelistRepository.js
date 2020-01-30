
const { BaseRepository } = require('@amberjs/core');

class WhitelistRepository extends BaseRepository {
  constructor({ WhitelistModel }) {
    super(WhitelistModel);
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

module.exports = WhitelistRepository;

