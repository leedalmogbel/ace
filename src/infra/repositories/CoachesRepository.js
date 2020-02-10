/* eslint-disable no-undef */

const { BaseRepository } = require('@amberjs/core');

class CoachesRepository extends BaseRepository {
  constructor({ CoachesModel }) {
    super(CoachesModel);
  }
  
  async createCoach (data) {
    return this.model.findOrCreate({
      where: {
        userId: data.userId,
      },
      defaults: {
        coachName: data.coachName
      }
    });
  }
}
module.exports = CoachesRepository;

