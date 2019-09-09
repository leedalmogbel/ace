
const { BaseRepository } = require('@brewery/core');

class CoachesRepository extends BaseRepository {
  constructor({ CoachesModel }) {
    super(CoachesModel);
  }
  
  async createCoach(userId, res) {
    const coach = await this.model.create({
      include: [{
        model: UserModel,
        where: {
          userType: 'coach'
        },
        through: {attributes: []}
      }],
      where: {userId: userId},
      attributes: ['id', 'userId']
    })
    return res.status(200).send(coach);
  }

  async findAllCoaches() {
    const allCoach = await this.model.find({
      include: [{
        model: UserModel,
        where: { 
          userType: 'coach'
        }
      }]
    })
    return res.status(200).send(allCoach);
  }

  async getById() {
    const coachId = await this.model.getById({
      include: [{
        model: UserModel,
        where: {
          userType: 'coach'
        }
      }]
   })
   return res.status(200).send(coachId)
  }
}
module.exports = CoachesRepository;

