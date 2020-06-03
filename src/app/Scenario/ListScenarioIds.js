const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');
const {UserId} = require('src/domain/Scenario');

class ListScenarioIds extends Operation {
  constructor({ ScenarioRepository }) {
    super();
    this.ScenarioRepository = ScenarioRepository;
  }

  async execute(params) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    // const scenario = new UserId(params);
   
    
    // const { valid, errors } = scenario.validate(params);

    // if (!valid) {
    //   return this.emit(VALIDATION_ERROR, {
    //     details: {
    //       errors : errors
    //     }
    //   });
    // }

    try {
      let idArr;
      if(params.userId){
        idArr = await this.ScenarioRepository.getAllScenariosAndModel(params).map((dt) => {
          let data = dt.dataValues;
          data.standardModel = data.standardModel.length;
          return dt;
        });
      }else{
        idArr = await this.ScenarioRepository.getAll({
          attributes:['id'],
          where : params
        });
      }

      
      
      const data = Utils().resSuccess(idArr);
      return this.emit(SUCCESS, data);
    } catch(error) {
      const dataError = Utils().resError(error);
      return this.emit(ERROR, dataError);
    }
  }
}

ListScenarioIds.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListScenarioIds;
    
