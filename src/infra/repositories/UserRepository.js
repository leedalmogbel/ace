const { BaseRepository } = require('@amberjs/core');

class UserRepository extends BaseRepository {
  constructor({ UserModel }) {
    super(UserModel);
  }

  async createEmail (data) {
    const year = new Date().getFullYear();
    const userId = parseInt(`${year}${Math.floor(Math.random()* 999999) + 100000}`);
    return this.model.findOrCreate({
      where: {
        email: data.email,
      },
      defaults: {
        id: userId,
        name: data.name,
        userType: data.userType,
        googleUserId: data.googleUserId,
        fbUserId: data.fbUserId,
        subscribed: data.subscribed,
      }
    });
  }

  async findCreateUpdate (data) {
    console.log(data);
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
        })
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
}

module.exports = UserRepository;

