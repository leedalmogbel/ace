/* eslint-disable no-undef */

const { BaseRepository } = require('@amberjs/core');

class CoachesRepository extends BaseRepository {
  constructor({ CoachesModel }) {
    super(CoachesModel);
  }
  
  async createCoach (data) {
    return await this.model.findOrCreate({
      where: {
        userId: data.userId,
      },
      defaults: {
        coachName: data.coachName
      }
    });
  }

  async findAllCoaches(res) {
    const allCoach = await this.model.find({
      include: [{
        model: UserModel,
        where: { 
          userType: 'coach'
        }
      }]
    });
    return res.status(200).send(allCoach);
  }

  async getById(res) {
    const coachId = await this.model.getById({
      include: [{
        model: UserModel,
        where: {
          userType: 'coach'
        }
      }]
    });
    return res.status(200).send(coachId);
  }
}
module.exports = CoachesRepository;

