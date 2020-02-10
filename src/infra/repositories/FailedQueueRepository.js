const { BaseRepository } = require('@amberjs/core');

class FailedQueueRepository extends BaseRepository {
  constructor({ FailedQueueModel }) {
    super(FailedQueueModel);
  }
}

module.exports = FailedQueueRepository;