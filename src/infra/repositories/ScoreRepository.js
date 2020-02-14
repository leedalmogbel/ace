
const { BaseRepository } = require('@amberjs/core');

class ScoreRepository extends BaseRepository {
  constructor({ ScoreModel }) {
    super(ScoreModel);
  }

  async getAllWithParams(params){
    return await this.model.findAll({
      where: params,
      order: [
        ['createdAt', 'DESC']
      ],
      limit: 4
    });
  }
}

module.exports = ScoreRepository;

