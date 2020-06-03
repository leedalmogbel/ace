const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');

const scenariosFields = ['activity', 'subActivityOne', 'subActivityTwo', 'subActivityThree', 'subActivityFour', 'subActivityFive', 'subActivitySix', 'subActivitySeven', 'subActivityEight', 'subActivityNine', 'subActivityTen']; 
const parseResult = (input) => input.reduce((acc, val) => {
  val.forEach(data => {
    Object.keys(data).forEach( (key) =>{
      let value = JSON.parse(JSON.stringify(data));
      if(value[key]){
        acc[key].push(value[key]);
      }
    });
  });
  return acc;
}, {
  activity : [],
  subActivityOne : [],
  subActivityTwo : [],
  subActivityThree : [],
  subActivityFour : [],
  subActivityFive : [],
  subActivitySix : [],
  subActivitySeven : [],
  subActivityEight : [],
  subActivityNine : [],
  subActivityTen : []
});


class ListScenarios extends Operation {
  constructor({ ScenarioRepository }) {
    super();
    this.ScenarioRepository = ScenarioRepository;
  }

  async execute(params) {
    const { SUCCESS, ERROR } = this.events;

    try {
      // add params to display only users scenario list
      let self = this;
      let results = await Promise.all(
        scenariosFields.map(field=>{
          return self.ScenarioRepository.getDistinctValues(field, params);
        })
      );
      
      const data = Utils().resSuccess(parseResult(results));
      return this.emit(SUCCESS, data);
    } catch(error) {
      const dataError = Utils().resError(error);
      return this.emit(ERROR, dataError);
    }
  }
}

ListScenarios.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListScenarios;
    
