
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
    let userId = params.userId;
    delete params.userId;
    
    return this.model.findAll({
      attributes: ['id'],
      where : params,
      include: [
        {
          model: this.StandardModel,
          attributes: ['id'],
          where : {
            userId : userId
          },
          //separate:true,
          as: 'standardModel',
          required : false
        }
      ],
    });
  }
}

module.exports = ScenarioRepository;

