const { Operation } = require('@amberjs/core');

const scenarios = {
  EXTRACTION: 'extraction',
  PERSON_DETECTION: 'personDetection',
  SCORE_GENERATION: 'scoreGeneration',
  MODEL_TRAINING: 'modelTraining'
};

class RetryFailedScenarios extends Operation {
  constructor({ FailedQueueRepository, ThirdPartyApis }) {
    super();
    this.FailedQueueRepository = FailedQueueRepository;
    this.ThirdPartyApis = ThirdPartyApis;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.events;

    try {
      const [failedScenario] = await this.FailedQueueRepository.getAll({
        where: {
          status: 'init'
        },
        order: [
          ['createdAt', 'ASC']
        ]
      });

      let retryResult;
      if(failedScenario) {
        let { source, data } = failedScenario;
        data = JSON.parse(data);

        switch(source) {
        case scenarios.EXTRACTION:
          retryResult = await this.ThirdPartyApis.callKeypointsExtraction(data);
          break;
        case scenarios.PERSON_DETECTION:
          retryResult = await this.ThirdPartyApis.callKeypointsExtraction(data);
          break;
        case scenarios.SCORE_GENERATION:
          retryResult = await this.ThirdPartyApis.callScoresGeneration(data);
          break;
        case scenarios.MODEL_TRAINING:
          retryResult = await this.ThirdPartyApis.callModelTraining(data);
          break;
        default:
          return this.emit(ERROR, `Invalid source "${source}" on failed scenario id ${failedScenario.id}`);
        }

        if(retryResult.data.message !== 'Busy') {
          await this.FailedQueueRepository.update(failedScenario.id, {
            status: 'processing'
          });
        }
        
      }

      return this.emit(SUCCESS, {});
    } catch(error) {
      return this.emit(ERROR, error);
    }
  }
}

RetryFailedScenarios.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = RetryFailedScenarios;
