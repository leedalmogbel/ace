
const { BaseRepository } = require('@amberjs/core');
const sequelize = require('sequelize');


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

  getAllScenariosAndModel(params){
    return this.model.findAll({
      attributes: ['scenario', 'id'],
      include: [
        {
          model: this.StandardModel,
          attributes: ['id'],
          where : params,
          //separate:true,
          as: 'standardModel',
          required : false
        }
      ],
    }).map((dt) => {
      let data = dt.dataValues;
      data.standardModel = data.standardModel.length;
      return dt;
    });
  }
}

module.exports = ScenarioRepository;

