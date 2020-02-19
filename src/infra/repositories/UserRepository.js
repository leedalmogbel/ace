const { BaseRepository } = require('@amberjs/core');

class UserRepository extends BaseRepository {
  constructor({ UserModel, PlayerRepository, CoachesRepository }) {
    super(UserModel);
    this.PlayerRepository = PlayerRepository;
    this.CoachesRepository = CoachesRepository;
  }

  async add(data) {
    let newUser = await this.model.create(data);

    
    if(newUser){
      if (data.userType == 'player'){
        //create player
        this.PlayerRepository.add({
          userId:newUser.id
        });
      }else if (data.userType == 'coach'){
        //create coach
        this.CoachesRepository.add({
          userId:newUser.id,
          coachName:newUser.name
        });
      }
    }

    return newUser;
    // after creation create user or coach

  }

  async subscribed(id, data) {
    return this.model.upsert({
      id: id,
      subscribed: data.subscribed
    },
    {
      returning: true
    });
  } 

  getByEmail(email) {
    return this.model.findOne({
      where: {
        email: email
      },
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt'
        ],
      }
    });
  }
}

module.exports = UserRepository;

