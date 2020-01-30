const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');

class TrainModel extends Operation {
  constructor({ PersonKeypointRepository, ThirdPartyApis }) {
    super();
    this.PersonKeypointRepository = PersonKeypointRepository;
    this.ThirdPartyApis = ThirdPartyApis;
  }

  async execute(param) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, SERVICE_UNAVAILABLE } = this.events;
    console.log('TRAINMODEL PARAMS : ', param);
    try {
      const personKeypoints = await this.PersonKeypointRepository.getAllKeypoints(param);
      console.log(personKeypoints);
      if(personKeypoints.length > 0){
        let trainingParams = {
          'user_id': param.userId,
          'scenario_id':param.scenarioId,
          'json_path': personKeypoints
        };

        console.log('TrainModel PARAMS : ', trainingParams);
        
        let response = await this.ThirdPartyApis.callModelTraining(trainingParams);
        if(response.data.message == 'Busy'){
          return this.emit(SERVICE_UNAVAILABLE, {message:'Server is busy for inference. Try again later.'});
        }
        return this.emit(SUCCESS, {message : 'Generating model.'});
      }
      
      return this.emit(VALIDATION_ERROR, {data:{
        message : 'No keypoints found.'
      }});

      
    } catch(error) {
      const dataError = Utils().resError(error);
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, dataError);
      }

      return this.emit(ERROR, dataError);
    }
  }
}

TrainModel.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND', 'SERVICE_UNAVAILABLE']);

module.exports = TrainModel;
