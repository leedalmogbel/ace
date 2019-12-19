
const { BaseRepository } = require('@amberjs/core');

class ScoreRepository extends BaseRepository {
  constructor({ ScoreModel }) {
    super(ScoreModel);
  }

  async getAllWithParams(params){
    if(params){
      return await this.model.findAll({
        where: params
      });
    }
    return await this.model.findAll();
  }
}

module.exports = ScoreRepository;

