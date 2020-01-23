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
    console.log('SCORE DATA :', data);
    const { valid, errors } = score.validate(data);
    if (!valid) {
      return this.emit(VALIDATION_ERROR, {
        details: {
          errors : errors
        }
      });
    }

    try {
      let scoreArr = data.score;
        if(scoreArr){
          let resultArr= await Promise.all(
            scoreArr.map(score => {
              return this.ScoreRepository.add({
                ...score,
                clipId: data.clipId,
                clipPersonId: data.clipPersonId,
                scenarioId: data.scenarioId
              });
            })
          );
          return this.emit(SUCCESS, {data:resultArr});
        }

        return this.emit(VALIDATION_ERROR, {
          details: {
            errors : 'Score cannot be empty.'
          }
        });
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
