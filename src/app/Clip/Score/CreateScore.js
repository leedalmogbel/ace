const { Operation } = require('@amberjs/core');
const Score = require('src/domain/Score');

class CreateScore extends Operation {
  constructor({ ScoreRepository }) {
    super();
    this.ScoreRepository = ScoreRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const score = new Score(data);

    const { valid, errors } = score.validate(data);
    if (!valid) {
      return this.emit(VALIDATION_ERROR, errors);
    }

    try {
      const newScore = await this.ScoreRepository.add(score);
      
      return this.emit(SUCCESS, newScore);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      return this.emit(ERROR, error);
    }
  }
}

CreateScore.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateScore;
