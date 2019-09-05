
const { BaseRepository } = require('@brewery/core');

class CoachesRepository extends BaseRepository {
  constructor({ CoachesModel }) {
    super(CoachesModel);
  }
  
  async createCoach() {
    return this.model.create({
      include: [{
        
      }]
    })
  }

  async findAllCoaches() {
    return this.model.find({
      include: [{
        model: UserModel,
        where: { 
          userType: 'coach'
        }
      }]
    })
  }

  async getById() {
    return this.model.find({
      include: [{
        model: UserModel,
        where: {
          userType: 'coach'
        }
      }]
   })
  }
}
module.exports = CoachesRepository;

