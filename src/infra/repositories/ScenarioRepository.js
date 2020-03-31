
const { BaseRepository } = require('@amberjs/core');


class ScenarioRepository extends BaseRepository {
  constructor({ ScenariosModel, StandardModel }) {
    super(ScenariosModel);
    this.StandardModel = StandardModel;
  }
 //getAllWithScenario
  getAllScenariosWithModel(params){
    return this.model.findAll({
      attributes: ['scenario', 'id'],
      include: [
        {
          model: this.StandardModel,
          attributes: ['id', 'modelLink'],
          where : params,
          as: 'standardModel',
        }
      ],
    });
  }
}

module.exports = ScenarioRepository;

