const { Operation } = require('@amberjs/core');
const {KeypointExtraction} = require('src/domain/Keypoint');
const Utils = require('src/infra/services/utils.js');

 
class GenerateKeypoints extends Operation {
  constructor({ PersonKeypointRepository, ThirdPartyApis, FailedQueueRepository }) {
    super();
    this.PersonKeypointRepository = PersonKeypointRepository;
    this.ThirdPartyApis = ThirdPartyApis;
    this.FailedQueueRepository = FailedQueueRepository;
  }

  async execute(clipPersonId, data) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR} = this.events;
    console.log('DATA : ', data);

    const parameters = {
      clipPersonId : clipPersonId,
      ...data
    };

    const keypoint = new KeypointExtraction(parameters);
    const { valid, errors } = keypoint.validate(parameters);

    if (!valid) {
      return this.emit(VALIDATION_ERROR, {
        details: {
          errors : errors
        }
      });
    }

    try {
        const personKeypoints = await this.PersonKeypointRepository.upsert(parameters);
          // GENERATE KEYPOINTS
        
        let extractionResponse = await this.ThirdPartyApis.callKeypointsExtraction(personKeypoints);
        //   let extractionResponse = {
        //       data:{
        //         message:'succcess'
        //   }};
        console.log('SetDetectedPersonKeypoints RESPONSE : ', extractionResponse);
        if(extractionResponse.data.message == 'Busy'){
            this.PersonKeypointRepository.update(personKeypoints.person_keypoint_id, {status:'failed'});
            this.FailedQueueRepository.add({
              data: JSON.stringify(personKeypoints),
              source: 'extraction',
            });
            return this.emit(VALIDATION_ERROR, {message:'Server is busy for inference. Try again later.'});
        }
        
        return this.emit(SUCCESS, {details:{message:'Generating keypoints.'}});
    } catch(error) {
      console.log(error);
      return this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GenerateKeypoints.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = GenerateKeypoints;
    
