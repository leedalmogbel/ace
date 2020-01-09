const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');

class TrainModel extends Operation {
  constructor({ PersonKeypointRepository, ThirdPartyApis }) {
    super();
    this.PersonKeypointRepository = PersonKeypointRepository;
    this.ThirdPartyApis = ThirdPartyApis;
  }

  async execute(param) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    try {
      const personKeypoints = await this.PersonKeypointRepository.getAllKeypoints(param);
      
      const data = Utils().resSuccess('', 'Start model training.');
      this.emit(SUCCESS, data);

      let trainingParams = {
        'user_id': param.userId,
        'scenario_id':param.scenarioId,
        'json_path': personKeypoints,
        'keypoint_map': 'all'
      };

      console.log('TrainModel PARAMS : ', trainingParams);
      let response = this.ThirdPartyApis.callModelTraining(trainingParams);

      return;
    } catch(error) {
      const dataError = Utils().resError(error);
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, dataError);
      }

      return this.emit(ERROR, dataError);
    }
  }
}

TrainModel.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = TrainModel;
