const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');

class TrainModel extends Operation {
  constructor({ PersonKeypointRepository, ThirdPartyApis, FailedQueueRepository, StandardModelRepository }) {
    super();
    this.PersonKeypointRepository = PersonKeypointRepository;
    this.ThirdPartyApis = ThirdPartyApis;
    this.FailedQueueRepository = FailedQueueRepository;
    this.StandardModelRepository = StandardModelRepository;
  }

  async execute(param) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
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
        // must update status in StandardModel if existing
        const standardModels = await this.StandardModelRepository.getAll({
          where : param
        });
        if(standardModels.length > 0){
          // update status to processing
          standardModels.map((data) => {
            data.update({status : 'Processing'});
          });
        }
        //let response = await this.ThirdPartyApis.callModelTraining(trainingParams);
        let response = {
          data:{message:'Busyno'}
        };
        if(response.data.message == 'Busy'){
          this.FailedQueueRepository.add({
            data: JSON.stringify(trainingParams),
            source: 'modelTraining',
          });
          return this.emit(SUCCESS, {message : 'Model generation on queue.'});
          //return this.emit(SERVICE_UNAVAILABLE, {message:'Server is busy for inference. Try again later.'});
        }
        // must update status in StandardModel if existing
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
