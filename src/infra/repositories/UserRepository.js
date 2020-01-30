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

  async findCreateUpdate (data) {
    const year = new Date().getFullYear();
    const userId = parseInt(`${year}${Math.floor(Math.random()* 999999) + 100000}`);
    return this.model.findOne({
      where: {
        email: data.email,
      }
    })
      .then( (foundUser) => {
        if (!foundUser) {
          return this.model.create({
            id: userId,
            name: data.name,
            email: data.email,
            userType: data.userType,
            googleUserId: data.googleUserId,
            fbUserId: data.fbUserId,
            subscribed: data.subscribed,
          });
        }
        return this.model.update({
          name: data.name,
          userType: data.userType,
          googleUserId: data.googleUserId,
          fbUserId: data.fbUserId,
          subscribed: data.subscribed,
        }, {
          where: { email: data.email },
          returning: true,
        // plain: true,
        });
      });
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

