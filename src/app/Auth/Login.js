const { Operation } = require('@amberjs/core');

class Login extends Operation {
  constructor({UserRepository, WhitelistRepository, PlayerRepository, CoachesRepository }) {
    super();
    this.UserRepository = UserRepository;
    this.WhitelistRepository = WhitelistRepository;
    this.PlayerRepository = PlayerRepository;
    this.CoachesRepository = CoachesRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.events;
    try {
      console.log('LOGIN DATA', data);
      
      data.userType = 'player';

      let whitelistData = await this.WhitelistRepository.getByEmail(data.email);
      if(whitelistData){
        data.userType = 'coach';
      }
      
      let updated = await this.UserRepository.upsert(data);
      let usersData = await this.UserRepository.getByEmail(data.email);
      console.log('USERDA DATA :', usersData);
      if(updated){
        if (data.userType == 'player'){
          //create player
          this.PlayerRepository.upsert({
            userId:usersData.id
          });
        }else if (data.userType == 'coach'){
          //create coach
          this.CoachesRepository.upsert({
            userId:usersData.id,
            coachName:usersData.name
          });
        }
      }
      // check email if existing in users table
      // check if email is in whitelist for userType
      // create or login user
      return this.emit(SUCCESS, {message:'You are successfully logged in', data:usersData});
      
    } catch(error) {
      return this.emit(ERROR, {details: {errors:error.message}});
    }
     
  }
}

Login.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = Login;
