const { Operation } = require('@amberjs/core');
const signURL = require('src/infra/services/signedUrl');

class GenerateModelSignedUrl extends Operation {
  constructor({ ThirdPartyApis, ClipRepository, StandardModelRepository, logger }) {
    super();
    this.ThirdPartyApis = ThirdPartyApis;
    this.ClipRepository = ClipRepository;
    this.StandardModelRepository = StandardModelRepository;
    this.logger = logger;
  }
 
  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
    this.logger.info(`Generate Model SignedUrl DATA : ${JSON.stringify(data)}`);
    const keypointArr = ['all', 'balance', 'ball_striking', 'movement'];
    
    try {
      // existing scenario Id and userId
      let resultArr= await Promise.all(
        keypointArr.map(keypoint => {
          let keyName = `models/${process.env.NODE_ENV}/${data.userId}/${data.scenarioId}/${String(Date.now())}_${keypoint}`.replace(/\s/g, '');
          let key = `${keyName}.h5`;
          let generatedData = signURL.generateSignedUrlForModel(key);
          generatedData.keypointMap = keypoint;
          this.StandardModelRepository.upsert({userId: data.userId, scenarioId: data.scenarioId, modelLink:generatedData.pathUrl, keypointMap: keypoint, status:'Completed'});
          return generatedData;
        })
      );
      this.logger.info(`Generate Model SignedUrl RESULT : ${JSON.stringify(resultArr)}`);

      return this.emit(SUCCESS, resultArr);
    } catch(error) {
      this.logger.error(`Generate Model SignedUrl ERROR : ${JSON.stringify(error)}`);
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

GenerateModelSignedUrl.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = GenerateModelSignedUrl;
