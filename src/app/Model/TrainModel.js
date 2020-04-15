const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');

const modelStatus = {
  COMPLETED : 'Completed',
  FAILED : 'Failed',
  PROCESSING : 'Processing'
};

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
      const personKeypoints = await this.PersonKeypointRepository.getAllKeypoints({
        ...param,
        status : 'successSkeleton'
      });

      
     
      if(personKeypoints.length > 0){
        console.log('WITH SUCCESS KEYPOINTS');
        let trainingParams = {
          'user_id': param.userId,
          'scenario_id':param.scenarioId,
          'json_path': personKeypoints
        };

        console.log('TrainModel PARAMS : ', trainingParams);
        // Upsert status 
        await this.StandardModelRepository.getAll({
          where : param
        }).then((standardModels) => {
          if(standardModels.length > 0){
            console.log('UPDATE ENTRY');
            return standardModels.map( model => {
              model.update({status : modelStatus.PROCESSING});
            })
          }else{
            console.log('ADD NEW ENTRY');
            return this.StandardModelRepository.add({
              ...param,
              modelLink : 'for-generation',
              status : modelStatus.PROCESSING
            });
          }
        });

      
       let response = await this.ThirdPartyApis.callModelTraining(trainingParams);
        // let response = {
        //   data:{message:'Busyno'}
        // };
        if(response.data.message == 'Busy'){
          this.FailedQueueRepository.add({
            data: JSON.stringify(trainingParams),
            source: 'modelTraining',
          });
          return this.emit(SUCCESS, {message : 'Model generation on queue.'});
          //return this.emit(SERVICE_UNAVAILABLE, {message:'Server is busy for inference. Try again later.'});
        }

        // handle server error
       
        return this.emit(SUCCESS, {message : 'Generating model.'});
      }
      console.log('NO SUCCESS KEYPOINTS');
      return this.emit(VALIDATION_ERROR, {data:{
        message : 'No keypoints found.'
      }});

      
    } catch(error) {
      console.log('ERRORS : ', error);
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
