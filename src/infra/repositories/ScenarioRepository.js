
const { BaseRepository } = require('@amberjs/core');
const sequelize = require('sequelize');


class ScenarioRepository extends BaseRepository {
  constructor({ ScenariosModel, StandardModel }) {
    super(ScenariosModel);
    this.StandardModel = StandardModel;
  }
  getDistinctValues(field, params){
    if(params.userId) delete params.userId;
    return this.model.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col(field)), field]],
      where : params,
      raw : true 
    });
  }


  getAllScenariosWithModel(params){
    return this.model.findAll({
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
      attributes: ['activity', 'id'],
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

